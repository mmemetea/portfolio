// The corner frame steps aside while scrolling down and returns on scroll up,
// so fixed corners never collide with content.
import { onScroll } from '../engine';

export function frameAway() {
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 160 && y > last);
    last = y;
  });
}
