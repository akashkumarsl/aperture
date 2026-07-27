"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SceneSectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  /** Full-viewport height section (default) vs. auto height. */
  fill?: boolean;
  /**
   * Clip overflow (default). Must be false for sections that contain a
   * `position: sticky` stage — an `overflow: hidden` ancestor silently breaks
   * sticky pinning.
   */
  clip?: boolean;
};

/**
 * Standard wrapper for a narrative act. Provides the section anchor (used by the
 * navbar + progress rail), relative positioning for absolutely-placed 3D and
 * lighting layers, and a consistent horizontal gutter.
 */
export const SceneSection = forwardRef<HTMLElement, SceneSectionProps>(
  ({ id, fill = true, clip = true, className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        aria-label={id}
        className={cn(
          "relative w-full px-6 md:px-10",
          clip && "overflow-hidden",
          fill && "min-h-screen",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

SceneSection.displayName = "SceneSection";
