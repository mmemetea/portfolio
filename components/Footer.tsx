import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-background transition-colors">
      <Container>
        <div className="flex flex-col items-center gap-2 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-foreground">
              Michaël Memeteau
            </p>
            <p className="mt-1 text-xs text-foreground/50">
              Lateral Thinker. Product &amp; Innovative Executive.
            </p>
          </div>
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Michaël Memeteau. All rights
            reserved. &middot;{" "}
            <a
              href="mailto:mmemetea@gmail.com"
              className="transition-colors hover:text-accent"
            >
              mmemetea@gmail.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
