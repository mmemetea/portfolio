"use client";

import { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";

export interface ProofLink {
  label: string;
  url: string;
}

export interface Project {
  _id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  tags?: string[] | null;
  proofLinks?: ProofLink[] | null;
  image?: Record<string, unknown> | null;
  order?: number | null;
}

interface ProjectFilterGridProps {
  projects: Project[];
}

export default function ProjectFilterGrid({
  projects,
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
              ? "bg-accent text-white"
              : "bg-foreground/10 text-foreground/70 hover:bg-foreground/15"
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
                ? "bg-accent text-white"
                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/15"
            }`}
            aria-pressed={selectedTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project._id}
              className="group overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.02] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground">
                  {project.title}
                </h3>

                {/* Subtitle */}
                {project.subtitle && (
                  <p className="mt-1 text-sm italic text-foreground/50">
                    {project.subtitle}
                  </p>
                )}

                {/* Description */}
                {project.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                    {project.description}
                  </p>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Proof Links */}
                {project.proofLinks && project.proofLinks.length > 0 && (
                  <div className="mt-4 border-t border-foreground/10 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.proofLinks.map((link, i) => (
                        <a
                          key={`${link.label}-${i}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                        >
                          <ExternalLink className="h-3 w-3 shrink-0" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-foreground/50">
          No projects match the selected filter.
        </p>
      )}
    </div>
  );
}
