"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Node = { id: number; x: number; y: number; layer: number; r: number; hot: boolean };
type Edge = { from: Node; to: Node; key: string };

/**
 * An animated neural / knowledge graph. Nodes are laid out in layers; edges
 * pulse with travelling light; a subset of "reasoning" nodes glow hotter to
 * suggest active inference. Pure SVG so it stays crisp and cheap.
 */
export function NeuralGraph({ className }: { className?: string }) {
  const { nodes, edges } = useMemo(() => buildGraph(), []);

  return (
    <svg viewBox="0 0 400 260" className={className} fill="none" aria-hidden>
      <defs>
        <radialGradient id="ng-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="60%" stopColor="#38e1ff" />
          <stop offset="100%" stopColor="rgba(56,225,255,0)" />
        </radialGradient>
        <radialGradient id="ng-hot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="55%" stopColor="#f5b942" />
          <stop offset="100%" stopColor="rgba(245,185,66,0)" />
        </radialGradient>
      </defs>

      {edges.map((e, i) => (
        <g key={e.key}>
          <line
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            stroke="rgba(150,190,255,0.32)"
            strokeWidth={0.8}
          />
          <motion.circle
            r={1.4}
            fill={e.to.hot ? "#f5b942" : "#38e1ff"}
            initial={{ cx: e.from.x, cy: e.from.y, opacity: 0 }}
            animate={{
              cx: [e.from.x, e.to.x],
              cy: [e.from.y, e.to.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.6 + (i % 5) * 0.25,
              repeat: Infinity,
              delay: (i % 7) * 0.35,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}

      {nodes.map((n) => (
        <g key={n.id}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r * 2.6}
            fill={n.hot ? "url(#ng-hot)" : "url(#ng-node)"}
            animate={{ opacity: n.hot ? [0.5, 0.95, 0.5] : [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.4 + n.id * 0.05, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.hot ? "#ffd479" : "#bfe9ff"} />
        </g>
      ))}
    </svg>
  );
}

function buildGraph() {
  const layers = [3, 5, 6, 5, 3];
  const nodes: Node[] = [];
  let id = 0;
  layers.forEach((count, layer) => {
    const x = 40 + (layer * 320) / (layers.length - 1);
    for (let i = 0; i < count; i++) {
      const y = 40 + (i * 180) / Math.max(1, count - 1) + (layer % 2) * 8;
      nodes.push({
        id: id++,
        x,
        y,
        layer,
        r: 2 + ((id * 37) % 16) / 10,
        hot: (id * 53) % 10 > 6,
      });
    }
  });

  const edges: Edge[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const a = nodes.filter((n) => n.layer === l);
    const b = nodes.filter((n) => n.layer === l + 1);
    a.forEach((from, idx) => {
      // Connect to two deterministic nodes in the next layer for a sparse mesh.
      const t1 = b[(idx) % b.length];
      const t2 = b[(idx + 2) % b.length];
      [t1, t2].forEach((to) => {
        if (to) edges.push({ from, to, key: `${from.id}-${to.id}` });
      });
    });
  }
  return { nodes, edges };
}
