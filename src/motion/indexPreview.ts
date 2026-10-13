// Index rows: a floating preview image follows the pointer and tilts with velocity.
// Fine pointers only; rows stay fully usable without it.
import { gsap } from 'gsap';
import { onPage, onScroll, isTouch, prefersReducedMotion } from '../engine';

export function indexPreview() {
  return onPage(() => {
    const list = document.querySelector('[data-index]');
    const box = document.querySelector<HTMLElement>('.preview');
    if (!list || !box || isTouch() || prefersReducedMotion()) return;
    const img = box.querySelector('img')!;
    const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
    const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
    let lastX = 0, px = 0, py = 0;
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      x(px); y(py); rot(gsap.utils.clamp(-12, 12, (px - lastX) * 0.6)); lastX = px;
    };
    const show = (e: Event) => {
      const src = (e.currentTarget as HTMLElement).dataset.preview;
      if (!src) return;
      if (img.getAttribute('src') !== src) img.src = src;
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
    };
    const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: 'expo.out' });
    list.querySelectorAll<HTMLAnchorElement>('a[data-preview]').forEach((a) => {
      a.addEventListener('pointerenter', show);
      a.addEventListener('focus', show);
    });
    list.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move, { passive: true });
    // Preload previews one at a time on idle (desktop, no data-saver) so swaps never abort mid-flight.
    if (!navigator.connection?.saveData) {
      const sources = [...list.querySelectorAll<HTMLAnchorElement>('a[data-preview]')]
        .map((a) => a.dataset.preview!)
        .filter(Boolean);
      const preloadNext = () => {
        const src = sources.shift();
        if (!src) return;
        const im = new Image();
        im.onload = im.onerror = () => requestIdleCallback(preloadNext);
        im.src = src;
      };
      requestIdleCallback?.(preloadNext);
    }
    // pointerleave never fires when the page scrolls out from under a still pointer: check on scroll.
    const off = onScroll(() => { if (!list.contains(document.elementFromPoint(px, py))) hide(); });
    return () => { removeEventListener('pointermove', move); off(); };
  });
}
