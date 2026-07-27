"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollStore";
import { NOISE_GLSL } from "./glsl/noise";

/** Story-phase colour keyframes: crude → gold → cyan → violet → gold → teal → warm-gold. */
const CORE_COLORS = [
  new THREE.Color("#3a2a12"), // crude
  new THREE.Color("#f5b942"), // aperture ignites (gold)
  new THREE.Color("#38e1ff"), // reasoning (cyan)
  new THREE.Color("#8b5cff"), // execution (violet)
  new THREE.Color("#f5b942"), // gold dataset
  new THREE.Color("#2ee6c5"), // training (teal)
  new THREE.Color("#ffd479"), // final reveal
];

function colorForPhase(phase: number, target: THREE.Color) {
  const i = Math.floor(phase);
  const f = phase - i;
  const a = CORE_COLORS[Math.min(i, CORE_COLORS.length - 1)];
  const b = CORE_COLORS[Math.min(i + 1, CORE_COLORS.length - 1)];
  target.copy(a).lerp(b, f);
}

const coreVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;
  varying float vDisp;

  ${NOISE_GLSL}

  // Domain-warped fbm — the churning, folding motion of a liquid surface.
  float disp(vec3 p){
    vec3 q = p * 0.42;
    float warp = fbm(q + uTime * 0.09);
    return fbm(q + warp + uTime * 0.06);
  }

  void main(){
    vec3 n = normalize(normal);
    float d = disp(position);
    vec3 displaced = position + n * d * uAmp;

    // Rebuild the normal from two displaced tangent neighbours so lighting
    // follows the churn (analytic gradient is avoided for shader simplicity).
    vec3 ref = abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent = normalize(cross(n, ref));
    vec3 bitangent = normalize(cross(n, tangent));
    float eps = 0.35;
    vec3 pT = position + tangent * eps;
    vec3 pB = position + bitangent * eps;
    vec3 dT = pT + normalize(pT) * disp(pT) * uAmp;
    vec3 dB = pB + normalize(pB) * disp(pB) * uAmp;
    vec3 newN = normalize(cross(dT - displaced, dB - displaced));
    if (dot(newN, n) < 0.0) newN = -newN;

    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * newN);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    vPos = displaced;
    vDisp = d;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorDeep;
  uniform vec3 uColorBright;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;
  varying float vDisp;

  ${NOISE_GLSL}

  void main(){
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(vViewDir);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.5);

    // Two-light setup — warm key, cool fill — sculpts the volume.
    vec3 L1 = normalize(vec3(0.6, 0.8, 0.5));
    vec3 L2 = normalize(vec3(-0.5, -0.2, -0.6));
    float diff = clamp(dot(N, L1), 0.0, 1.0) + clamp(dot(N, L2), 0.0, 1.0) * 0.35;
    vec3 H = normalize(L1 + V);
    float spec = pow(clamp(dot(N, H), 0.0, 1.0), 48.0);

    // Flowing molten bands drifting under the surface.
    float bands = fbm(vPos * 0.75 + uTime * 0.16);
    vec3 base = mix(uColorDeep, uColorBright, smoothstep(-0.45, 0.6, bands + vDisp * 0.6));

    vec3 color = base * (0.28 + diff * 0.85);
    color += uColorBright * fres * 1.25;                 // fresnel rim
    color += vec3(1.0) * spec * 0.55;                    // wet highlight
    color += uColorBright * pow(max(vDisp, 0.0), 1.5) * 0.45; // crest glow

    gl_FragColor = vec4(color, 1.0);
  }
`;

const glowVertex = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main(){
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vN;
  varying vec3 vV;
  void main(){
    float f = pow(1.0 - clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0), 3.0);
    gl_FragColor = vec4(uColor * f * 1.6, f * 0.55);
  }
`;

/**
 * The Aperture "liquid core" — a shader-displaced droplet of data that churns
 * like living fluid, wrapped in a fresnel glow halo and counter-rotating
 * aperture rings that widen as the story advances ("bringing data into focus").
 * Recolours crude → gold → signal as the narrative progresses. Replaces the
 * old distort-blob and is the visual through-line across every act.
 */
export function LiquidCore({ detail = 5, radius = 3.0 }: { detail?: number; radius?: number }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.ShaderMaterial>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);
  const ringMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const tmp = useRef(new THREE.Color());
  const deep = useRef(new THREE.Color());

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.42 },
      uColorDeep: { value: new THREE.Color("#3a2a12") },
      uColorBright: { value: new THREE.Color("#f5b942") },
    }),
    [],
  );
  const glowUniforms = useMemo(() => ({ uColor: { value: new THREE.Color("#f5b942") } }), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const phase = scrollState.phase;
    colorForPhase(phase, tmp.current);
    deep.current.copy(tmp.current).multiplyScalar(0.22);

    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.12;
      group.current.position.x += (scrollState.pointerX * 1.2 - group.current.position.x) * 0.04;
      group.current.position.y += (-scrollState.pointerY * 0.8 - group.current.position.y) * 0.04;
    }

    if (coreMat.current) {
      const u = coreMat.current.uniforms;
      u.uTime.value += delta;
      (u.uColorBright.value as THREE.Color).lerp(tmp.current, 0.05);
      (u.uColorDeep.value as THREE.Color).lerp(deep.current, 0.05);
      // The droplet churns hardest while Aperture "reasons" (acts 2–3).
      const targetAmp = 0.34 + Math.max(0, 1 - Math.abs(phase - 2.5)) * 0.34;
      u.uAmp.value += (targetAmp - u.uAmp.value) * 0.04;
    }
    if (glowMat.current) {
      (glowMat.current.uniforms.uColor.value as THREE.Color).lerp(tmp.current, 0.05);
    }

    if (rings.current) {
      rings.current.rotation.z -= delta * 0.18;
      // Aperture opens as the story advances.
      const s = 1.0 + phase * 0.055;
      rings.current.scale.setScalar(s);
      ringMats.current.forEach((m, i) => {
        if (m) {
          m.color.lerp(tmp.current, 0.05);
          m.opacity = 0.12 + 0.03 * Math.sin(t * 0.6 + i);
        }
      });
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[radius, detail]} />
        <shaderMaterial
          ref={coreMat}
          uniforms={coreUniforms}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
        />
      </mesh>

      {/* Fresnel glow halo — fakes volumetric bloom (no postprocessing dep). */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[radius, 3]} />
        <shaderMaterial
          ref={glowMat}
          uniforms={glowUniforms}
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Counter-rotating aperture rings — the camera-lens brand motif. */}
      <group ref={rings}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.5, i * 0.6, i * 0.9]}>
            <torusGeometry args={[radius + 1.4 + i * 0.5, 0.02 + i * 0.008, 8, 128]} />
            <meshBasicMaterial
              ref={(m) => {
                if (m) ringMats.current[i] = m;
              }}
              color="#f5b942"
              transparent
              opacity={0.14}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 0, 0]} intensity={6} distance={26} color="#ffd479" />
    </group>
  );
}
