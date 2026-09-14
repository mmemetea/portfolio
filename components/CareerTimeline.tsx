"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineEntry {
  year: string;
  company: string;
  role: string;
  current?: boolean;
}

interface Props {
  entries: TimelineEntry[];
}

export default function CareerTimeline({ entries }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    checkScroll();
  }, [checkScroll]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  }, [checkScroll]);

  return (
    <div className="relative">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-secondary shadow-sm backdrop-blur-sm transition-colors hover:text-accent hover:border-accent/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-secondary shadow-sm backdrop-blur-sm transition-colors hover:text-accent hover:border-accent/30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Fade edges */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-4 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-4 z-10 w-8 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="relative flex items-start gap-0 flex-row-reverse px-2 pt-1" style={{ width: "max-content" }}>
          {/* Horizontal line */}
          <div
            aria-hidden="true"
            className="absolute top-[7px] left-2 right-2 h-px bg-foreground/15"
          />

          {entries.map((entry, i) => (
            <div key={i} className="relative flex flex-col items-center px-3 sm:px-4 first:pl-0 last:pr-0">
              <div
                className={`relative z-10 h-[15px] w-[15px] shrink-0 rounded-full border-2 ${
                  entry.current
                    ? "border-accent bg-accent shadow-[0_0_8px_rgba(13,148,136,0.4)]"
                    : "border-foreground/25 bg-background"
                }`}
              />

              <span className={`mt-2 text-xs font-semibold whitespace-nowrap ${entry.current ? "text-accent" : "text-secondary"}`}>
                {entry.year}
                {entry.current ? " –" : ""}
              </span>

              <span className="mt-1 max-w-[110px] text-center text-xs font-medium leading-tight text-secondary">
                {entry.company}
              </span>

              <span className="mt-0.5 max-w-[110px] text-center text-[10px] leading-tight text-secondary">
                {entry.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
