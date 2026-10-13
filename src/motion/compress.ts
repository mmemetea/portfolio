// The signature: a compression run. One scroll progress drives the timetable grid filling,
// the day counter climbing, the stage compressing, and the seven-second result locking in.
// Real numbers from the tb.lx story: one month of Excel → under seven seconds.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, isMobile, prefersReducedMotion } from '../engine';
import { idle } from './idle';

gsap.registerPlugin(ScrollTrigger);

export function startRun() {
  onPage(() => {
    // The hero plate bar: compresses across the hero scroll, breathes a hair at rest (the verb, live).
    const hero = document.querySelector<HTMLElement>('.hero');
    const bar = document.querySelector<HTMLElement>('[data-hero-bar]');
    if (hero && bar && !prefersReducedMotion()) {
      let p = 0;
      ScrollTrigger.create({
        trigger: hero, start: 'top top', end: 'bottom top', scrub: true,
        onUpdate: (self) => { p = self.progress; },
      });
      const tick = () => {
        const breath = 1 + Math.sin(idle.t * 0.7) * 0.006 + idle.x * 0.01;
        gsap.set(bar, { scaleX: Math.max(0.05, (1 - p * 0.86) * breath) });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    }
  });

  onPage(() => {
    const section = document.querySelector<HTMLElement>('[data-run]');
    if (!section) return;
    const stage = section.querySelector<HTMLElement>('[data-run-stage]')!;
    const grid = section.querySelector<HTMLElement>('[data-run-grid]')!;
    const cells = gsap.utils.toArray<HTMLElement>('[data-run-cell]', grid);
    const days = section.querySelector<HTMLElement>('[data-run-days]')!;
    const hud = section.querySelector<HTMLElement>('[data-run-hud]')!;
    const result = section.querySelector<HTMLElement>('[data-run-result]')!;
    const resultLine = section.querySelector<HTMLElement>('[data-run-line]')!;
    const timeEl = section.querySelector<HTMLElement>('[data-run-time]')!;
    if (!cells.length) return;

    if (prefersReducedMotion()) {
      // Static end state: the run already resolved.
      gsap.set(cells, { autoAlpha: 1 });
      days.textContent = 'DAY 30';
      gsap.set(stage, { scaleX: 1 });
      gsap.set(result, { autoAlpha: 1 });
      gsap.set(hud, { autoAlpha: 0 });
      timeEl.textContent = '7.00';
      return;
    }

    const counter = { day: 1, time: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: 'top top', end: isMobile() ? '+=170%' : '+=250%',
        pin: true, scrub: 1, invalidateOnRefresh: true,
      },
    });
    tl.addLabel('fill')
      .fromTo(cells, { autoAlpha: 0.06 }, {
        autoAlpha: 1, duration: 0.5, ease: 'none',
        stagger: { each: 0.004, from: 'start' },
      }, 'fill')
      .to(counter, {
        day: 30, duration: 0.5, ease: 'none',
        onUpdate: () => { days.textContent = `DAY ${String(Math.round(counter.day)).padStart(2, '0')}`; },
      }, 'fill')
      .addLabel('compress', '+=0.05')
      .to(hud, { autoAlpha: 0, y: -14, duration: 0.12, ease: 'none' }, 'compress')
      .to(grid, { scaleX: 0.04, transformOrigin: 'left center', duration: 0.26, ease: 'power4.in' }, 'compress')
      .to(cells, { autoAlpha: 0.9, duration: 0.1, ease: 'none' }, 'compress')
      .addLabel('resolve')
      .fromTo(result, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06, ease: 'none' }, 'resolve')
      .fromTo(resultLine, { yPercent: 110 }, { yPercent: 0, duration: 0.1, ease: 'power3.out' }, 'resolve')
      .to(counter, {
        time: 7, duration: 0.12, ease: 'power1.in',
        onUpdate: () => { timeEl.textContent = counter.time.toFixed(2); },
      }, 'resolve')
      .to({}, { duration: 0.08 }); // hold the final frame
  });
}
