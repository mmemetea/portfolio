// Global motion for this site: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { setLoaderFormat, setLoaderExit, setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startClock, elapsedSeconds, formatElapsed } from './clock';
import { indexPreview } from './indexPreview';
import { frameAway } from './frame';

export function setupMotion() {
  // Page transition: the ink curtain rises with a signal leading edge — the run closes, the next opens.
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.9, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  // Loader = the session stopwatch, counting real elapsed seconds.
  setLoaderFormat(() => formatElapsed(elapsedSeconds()));

  // Handoff: the measured number stays exactly where the corner clock lives; the paper lifts.
  // Transform only: yPercent composites on the GPU, cheap enough for throttled phones.
  setLoaderExit((root) => gsap.timeline()
    .to(root.querySelector('.loader__bar'), { scaleX: 1, duration: 0.01 })
    .to(root, { yPercent: -100, duration: 0.55, ease: ease.inOut }, '+=0.08')
    .add(() => startClock(), '-=0.35'));

  startIdle();
  indexPreview();
  frameAway();
}
