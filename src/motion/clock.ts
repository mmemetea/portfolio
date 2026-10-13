// The session stopwatch. The loader counts real elapsed seconds; when it exits, the corner
// clock takes over from the same t0, so the handoff is one continuous measurement.
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../engine';

export const T0 = performance.now();

export function elapsedSeconds(): number {
  return (performance.now() - T0) / 1000;
}

export function formatElapsed(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s - m * 60;
  return `${m}:${sec.toFixed(1).padStart(4, '0')}`;
}

export function startClock() {
  if (prefersReducedMotion()) {
    const el0 = document.querySelector<HTMLElement>('[data-clock]');
    if (el0) el0.textContent = `T+${formatElapsed(elapsedSeconds())}`;
    return;
  }
  let el = document.querySelector<HTMLElement>('[data-clock]');
  const tick = () => {
    if (!el?.isConnected) el = document.querySelector<HTMLElement>('[data-clock]');
    if (el) el.textContent = `T+${formatElapsed(elapsedSeconds())}`;
  };
  tick();
  gsap.ticker.add(tick);
}
