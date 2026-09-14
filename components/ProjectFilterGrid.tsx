"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { withBasePath } from "@/lib/paths";
import EmptyMedia from "./EmptyMedia";

interface ProjectFilterGridProps {
  projects: Project[];
  /** Tag-filter bar; off for small grouped sections (e.g. the bench). */
  showFilters?: boolean;
}

export default function ProjectFilterGrid({
  projects,
  showFilters = true,
}: ProjectFilterGridProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const project of projects) {
      if (project.tags) {
        for (const tag of project.tags) {
          tagSet.add(tag);
        }
      }
    }
    return Array.from(tagSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => project.tags?.includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <div>
      {/* Filter Bar */}
      {showFilters && (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by tag"
        >
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              selectedTag === null
                ? "bg-accent text-background"
                : "bg-foreground/10 text-secondary hover:bg-foreground/15"
            }`}
            aria-pressed={selectedTag === null}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag((prev) => (prev === tag ? null : tag))}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-accent text-background"
                  : "bg-foreground/10 text-secondary hover:bg-foreground/15"
              }`}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const firstImage = project.images?.[0];

            return (
              <article
                key={project._id}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.02] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/5"
              >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-foreground/[0.03]">
                    {firstImage ? (
                      <Image
                        src={withBasePath(firstImage.src)}
                        alt={firstImage.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <EmptyMedia />
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-foreground/[0.02] to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground">
                      {/* stretched link: ::after fills the card so the whole card is clickable */}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    {/* Subtitle */}
                    {project.subtitle && (
                      <p className="mt-1 text-sm italic text-secondary">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    {project.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-secondary">
                        {project.description}
                      </p>
                    )}

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Proof Links */}
                    {project.proofLinks && project.proofLinks.length > 0 && (
                      <div className="mt-auto border-t border-foreground/10 pt-4">
                        <div className="flex flex-wrap gap-2">
                  {project.proofLinks.map((link, i) =>
                    link.url ? (
                      <a
                        key={`${link.label}-${i}`}
                        href={withBasePath(link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/20"
                      >
                        <ExternalLink className="h-3 w-3 shrink-0" />
                        {link.label}
                      </a>
                    ) : (
                      <span
                        key={`${link.label}-${i}`}
                        className="inline-flex items-center rounded-lg bg-foreground/5 px-2.5 py-1.5 text-xs font-medium text-secondary"
                      >
                        {link.label}
                      </span>
                    )
                  )}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
            );
          })}
        </div>
      ) : (
        <p className="py-16 text-center text-secondary">
          No projects match the selected filter.
        </p>
      )}
    </div>
  );
}
