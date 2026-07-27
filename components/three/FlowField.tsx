"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollStore";
import { NOISE_GLSL } from "./glsl/noise";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSeed;
  varying float vSeed;
  varying float vDepth;
  varying float vSpeed;

  ${NOISE_GLSL}

  void main() {
    vSeed = aSeed;
    vec3 p = position;

    // Advect each particle along a divergence-free curl-noise flow field so the
    // cloud streams like an incompressible fluid rather than jittering in place.
    float t = uTime * 0.05;
    vec3 f1 = curlNoise(p * 0.045 + vec3(0.0, 0.0, t));
    vec3 f2 = curlNoise(p * 0.11 - vec3(t * 0.6, 0.0, 0.0));
    vec3 flow = f1 * (2.6 + aScale) + f2 * 1.3;
    p += flow;
    vSpeed = length(f1);

    // A slow orbital swirl reinforces the sense of liquid circulation.
    float ang = t * 0.15;
    float ca = cos(ang), sa = sin(ang);
    p.xz = mat2(ca, -sa, sa, ca) * p.xz;

    // The field gathers toward the core as the story progresses.
    p *= 1.0 - uPhase * 0.02;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (60.0 / vDepth);
  }
`;

const fragment = /* glsl */ `
  uniform float uPhase;
  varying float vSeed;
  varying float vDepth;
  varying float vSpeed;

  // Crude → gold → signal palette, chosen per particle + story phase.
  vec3 palette(float t) {
    vec3 crude  = vec3(0.55, 0.34, 0.10);
    vec3 gold   = vec3(1.00, 0.72, 0.26);
    vec3 cyan   = vec3(0.22, 0.88, 1.00);
    vec3 violet = vec3(0.55, 0.36, 1.00);
    vec3 c = mix(crude, gold, smoothstep(0.0, 0.45, t));
    c = mix(c, cyan, smoothstep(0.4, 0.75, t));
    c = mix(c, violet, smoothstep(0.75, 1.0, t));
    return c;
  }

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha;

    float phase = clamp(uPhase / 6.0 + (vSeed - 0.5) * 0.25, 0.0, 1.0);
    vec3 color = palette(phase);
    // Faster-moving droplets read a touch brighter, like catching the light.
    color += vec3(0.25) * clamp(vSpeed, 0.0, 1.0);

    float fog = clamp(1.0 - (vDepth - 20.0) / 90.0, 0.15, 1.0);
    gl_FragColor = vec4(color, alpha * fog * 0.9);
  }
`;

/**
 * Ambient "data mist" — thousands of points advected along a curl-noise flow
 * field so they stream like liquid through the world. Recolours crude → gold →
 * signal with the story phase. Purely GPU-side; keeps a stable buffer and does
 * all motion in the vertex shader for a 120fps budget. Replaces ParticleField.
 */
export function FlowField({ count = 2600, radius = 46 }: { count?: number; radius?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, scales, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a flattened ellipsoid shell for a "corridor of dust" look.
      const r = radius * (0.35 + Math.random() * 0.65);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.3;
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.8;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - radius * 0.4;
      scales[i] = 0.4 + Math.random() * 2.2;
      seeds[i] = Math.random();
    }
    return { positions, scales, seeds };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPhase: { value: 0 },
      uSize: { value: 6.5 },
      uPixelRatio: { value: 1 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (matRef.current) {
      const u = matRef.current.uniforms;
      u.uTime.value += delta;
      u.uPhase.value += (scrollState.phase - u.uPhase.value) * 0.06;
      u.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
