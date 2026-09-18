import { Link } from '@tanstack/react-router';
import { Accent } from './ui/typography';
import { SignOutButton } from './signout-button';

export function AppHeader() {
    return (
        <header className="mx-auto flex h-21.5 w-[calc(100%-28px)] max-w-[var(--container-max)] shrink-0 items-center justify-between gap-4 border-b border-border min-[721px]:w-[calc(100%-40px)]">
            <Link
                to="/app"
                aria-label="AuthLab — início do app"
                className="inline-flex min-h-[var(--touch-target-min)] items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-focus"
            >
                <img
                    src="/arthur-labs-logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain"
                />
                <span className="font-display text-[17px] font-semibold tracking-[-0.04em]">
                    Auth<Accent className="font-medium">Lab</Accent>
                </span>
            </Link>
            <SignOutButton />
        </header>
    );
}
