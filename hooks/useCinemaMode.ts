"use client";

import { useSyncExternalStore } from "react";

/**
 * Cinema / recording mode.
 *
 * When active, all persistent chrome (top navbar, right-rail scene legend) is
 * hidden so the scroll experience can be screen-recorded cleanly. State lives in
 * a tiny module-level store shared by every consumer via useSyncExternalStore.
 *
 * Activation:
 *   • URL param  ?record=1  (or ?clean=1, or #record) starts in cinema mode.
 *   • Press  C  anywhere to toggle chrome on/off.
 *   • Press  Escape  to exit cinema mode.
 */

let active = false;
const listeners = new Set<() => void>();
let wired = false;

function emit() {
  listeners.forEach((l) => l());
}

export function setCinemaMode(next: boolean) {
  if (active === next) return;
  active = next;
  if (typeof document !== "undefined") {
    document.documentElement.dataset.cinema = active ? "on" : "off";
  }
  emit();
}

export function toggleCinemaMode() {
  setCinemaMode(!active);
}

/** Wire URL detection + keyboard shortcuts exactly once on the client. */
function ensureWired() {
  if (wired || typeof window === "undefined") return;
  wired = true;

  const params = new URLSearchParams(window.location.search);
  const wanted =
    params.get("record") === "1" ||
    params.get("clean") === "1" ||
    window.location.hash === "#record";
  if (wanted) setCinemaMode(true);

  window.addEventListener("keydown", (e) => {
    // Ignore when typing into a field.
    const el = e.target as HTMLElement | null;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
    if (e.key === "c" || e.key === "C") {
      e.preventDefault();
      toggleCinemaMode();
    } else if (e.key === "Escape" && active) {
      setCinemaMode(false);
    }
  });
}

function subscribe(cb: () => void) {
  ensureWired();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return active;
}

function getServerSnapshot() {
  return false;
}

/** Read the current cinema-mode flag (re-renders on change). */
export function useCinemaMode(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
