"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/lib/projects";

interface ImageCarouselProps {
  images: ProjectImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, total]);

  useEffect(() => {
    if (!containerRef.current) return;
    const thumb = containerRef.current.querySelector<HTMLButtonElement>(
      `[data-idx="${current}"]`
    );
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [current]);

  if (total === 0) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03]">
        <Image
          src="/placeholder.svg"
          alt="No images yet"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm font-medium text-foreground/40">
            Images coming soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03]">
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={current === 0}
        />

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
          <p className="text-sm text-white/90">{images[current].alt}</p>
        </div>

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      </div>

      {/* Thumbnail strip */}
      {total >= 3 && (
        <div
          ref={containerRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              data-idx={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === current
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot indicators (for < 3 images) */}
      {total >= 2 && total < 3 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === current
                  ? "bg-accent w-6"
                  : "bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
