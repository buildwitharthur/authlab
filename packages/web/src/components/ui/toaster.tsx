import type { CSSProperties } from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
    return (
        <SonnerToaster
            theme="dark"
            position="bottom-right"
            closeButton
            toastOptions={{
                style: {
                    '--normal-bg': 'var(--paper)',
                    '--normal-text': 'var(--ink-975)',
                    '--normal-border': 'var(--line-light)',
                    fontFamily: 'var(--font-body)',
                    borderRadius: 'var(--radius-md)',
                } as CSSProperties,
            }}
        />
    );
}
