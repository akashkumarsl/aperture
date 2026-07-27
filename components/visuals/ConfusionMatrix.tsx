"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * A confusion matrix that "cleans itself": off-diagonal noise fades while the
 * diagonal locks in, visualising a model that has become well-calibrated and
 * balanced across classes.
 */
export function ConfusionMatrix({ size = 6, className }: { size?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const cells = useMemo(() => {
    const out: { r: number; c: number; noise: number }[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Deterministic pseudo-noise so SSR and client agree.
        const noise = ((r * 7 + c * 13 + 5) % 10) / 10;
        out.push({ r, c, noise });
      }
    }
    return out;
  }, [size]);

  return (
    <div ref={ref} className={className}>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {cells.map(({ r, c, noise }) => {
          const isDiag = r === c;
          const target = isDiag ? 0.85 + noise * 0.15 : noise * 0.16;
          return (
            <motion.div
              key={`${r}-${c}`}
              initial={{ opacity: 0.5 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="aspect-square rounded-[3px]"
              style={{
                background: isDiag
                  ? `rgba(46,230,197,${target})`
                  : `rgba(255,255,255,${target})`,
                boxShadow: isDiag ? `0 0 12px rgba(46,230,197,${target * 0.5})` : "none",
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-white/55">
        <span>predicted</span>
        <span>balanced · calibrated</span>
      </div>
    </div>
  );
}
