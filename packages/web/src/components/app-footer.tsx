export function AppFooter() {
  return (
    <footer className="mx-auto flex min-h-26.5 w-[calc(100%-28px)] max-w-[var(--container-max)] shrink-0 flex-col items-start justify-center gap-[var(--space-5)] border-t border-border py-[var(--space-5)] min-[721px]:w-[calc(100%-40px)] min-[721px]:flex-row min-[721px]:items-center min-[721px]:justify-between">
      <div className="grid gap-1">
        <strong className="font-display text-[13px] text-foreground">
          AuthLab
        </strong>
        <span className="text-[11px] text-muted-foreground">
          Um experimento ArthurLabs.
        </span>
      </div>
      <a
        href="https://arthurlabs.io"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ArthurLabs (abre em uma nova aba)"
        className="inline-flex min-h-[var(--touch-target-min)] items-center gap-1 rounded-[var(--radius-sm)] text-[11px] text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:text-primary focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none"
      >
        arthurlabs.io <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}
