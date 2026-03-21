import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Articles | Michaël Memeteau",
  description: "Published writing and talks",
};

interface Article {
  _id: string;
  title: string;
  url: string;
  publication?: string | null;
  date: string;
  excerpt?: string | null;
  tags?: string[] | null;
}

const articles: Article[] = [
  {
    _id: "fallback-kanban",
    title: "Kanban, the alternative path to agility",
    url: "https://medium.com",
    publication: "Medium / tb.lx",
    date: "2021-03-15",
    excerpt:
      "How we implemented Kanban at tb.lx for the Daimler after-sales digital transformation. A practical account of moving from Scrum to a flow-based approach that improved delivery predictability and reduced overhead for the team.",
    tags: ["Agile", "Kanban", "Digital Transformation"],
  },
  {
    _id: "fallback-polyurethane",
    title: "Polyurethane, Meet 3D Printing",
    url: "https://hackaday.com",
    publication: "Hackaday",
    date: "2017-06-20",
    excerpt:
      "Documenting the NESTO prototyping journey — using 3D-printed molds to produce polyurethane sensor enclosures for IoT gas level monitors. A maker's take on bridging the gap between digital fabrication and industrial materials.",
    tags: ["IoT", "3D Printing", "Making"],
  },
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Articles
          </h1>
          <p className="mt-3 text-lg text-foreground/60">
            Published writing and talks
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article._id}
                className="group rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/5"
              >
                {/* Publication */}
                {article.publication && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {article.publication}
                  </p>
                )}

                {/* Title */}
                <h3 className="mt-2 text-xl font-bold leading-tight text-foreground">
                  {article.title}
                </h3>

                {/* Date */}
                <time
                  dateTime={article.date}
                  className="mt-2 block text-sm text-foreground/50"
                >
                  {formatDate(article.date)}
                </time>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                    {article.excerpt}
                  </p>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read Link */}
                <div className="mt-4 border-t border-foreground/10 pt-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    Read on {article.publication ?? "external site"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-foreground/50">
            No articles yet. Check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}
