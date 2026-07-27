"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { FlowField } from "./FlowField";
import { LiquidCore } from "./LiquidCore";
import { CameraRig } from "./CameraRig";
import { useScrollStoreSync } from "./scrollStore";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The persistent WebGL "world" that sits behind every DOM scene. A single fixed
 * canvas gives us one continuous space the camera can fly through — the key to
 * the film-like sense of depth and motion. It is purely ambient: pointer events
 * pass straight through to the content above it.
 */
export function CanvasStage() {
  useScrollStoreSync();
  const tier = useDeviceTier();
  const reduced = useReducedMotion();

  const particleCount = reduced ? 900 : tier === "high" ? 2800 : tier === "mid" ? 1500 : 800;
  const coreDetail = reduced ? 3 : tier === "high" ? 5 : tier === "mid" ? 4 : 3;
  const maxDpr = tier === "high" ? 2 : 1.5;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, maxDpr]}
        camera={{ position: [0, 4, 20], fov: 45, near: 0.1, far: 200 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <color attach="background" args={["#04060b"]} />
        <fog attach="fog" args={["#04060b", 22, 78]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[8, 12, 6]} intensity={0.7} color="#ffd9a0" />
        <directionalLight position={[-10, -4, -6]} intensity={0.4} color="#4c7bff" />

        <Suspense fallback={null}>
          <LiquidCore detail={coreDetail} />
          <FlowField count={particleCount} />
        </Suspense>

        {!reduced && <CameraRig />}
      </Canvas>

      {/* Depth grade: darken edges so the 3D melts into the page. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_30%,transparent_40%,rgba(4,6,11,0.85)_100%)]" />
    </div>
  );
}
