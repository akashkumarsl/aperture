"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollStore";

/** Camera dolly keyframes, one per act. The path descends into the reservoir,
 *  pulls back to reveal the refinery, orbits the reasoning core, then rises for
 *  the final reveal — all interpolated continuously from scroll. */
const CAM_KEYS: [number, number, number][] = [
  [0, 9, 20],   // 01 look down into the reservoir
  [0, 2, 17],   // 02 refinery reveal
  [-4, 1, 14],  // 03 orbit left — reasoning
  [4, 1, 13],   // 04 orbit right — engines
  [0, 1.5, 15], // 05 training dashboard
  [0, 3, 18],   // 06 pull back — the loop
  [0, 0, 12],   // 07 push in — final reveal
];

function samplePath(phase: number, out: THREE.Vector3) {
  const i = Math.floor(phase);
  const f = phase - i;
  const a = CAM_KEYS[Math.min(i, CAM_KEYS.length - 1)];
  const b = CAM_KEYS[Math.min(i + 1, CAM_KEYS.length - 1)];
  out.set(
    THREE.MathUtils.lerp(a[0], b[0], f),
    THREE.MathUtils.lerp(a[1], b[1], f),
    THREE.MathUtils.lerp(a[2], b[2], f),
  );
}

export function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 2, 20));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    samplePath(scrollState.phase, target.current);

    // Layer in pointer parallax + a slow breathing bob.
    target.current.x += scrollState.pointerX * 1.6;
    target.current.y += -scrollState.pointerY * 1.0;

    camera.position.lerp(target.current, 0.05);
    camera.lookAt(lookAt.current);
  });

  return null;
}
