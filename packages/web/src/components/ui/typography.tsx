import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

export const headingVariants = tv({
    base: 'font-display text-foreground',
    variants: {
        size: {
            'display-xl':
                'text-[length:var(--text-display-xl)] leading-[var(--leading-display-xl)] tracking-[var(--tracking-display-xl)] font-[number:var(--weight-display)]',
            'display-l':
                'text-[length:var(--text-display-l)] leading-[var(--leading-display-l)] tracking-[var(--tracking-display-l)] font-[number:var(--weight-display)]',
            md: 'text-[length:var(--text-heading-m)] leading-[var(--leading-heading-m)] tracking-[var(--tracking-heading-m)] font-[number:var(--weight-heading)]',
            sm: 'text-[length:var(--text-heading-s)] leading-[var(--leading-heading-s)] tracking-[var(--tracking-heading-s)] font-[number:var(--weight-heading-s)]',
        },
    },
    defaultVariants: { size: 'md' },
});

export interface HeadingProps
    extends ComponentProps<'h2'>, VariantProps<typeof headingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({
    as: Tag = 'h2',
    size,
    className,
    ...props
}: HeadingProps) {
    return (
        <Tag
            data-slot="heading"
            className={twMerge(headingVariants({ size }), className)}
            {...props}
        />
    );
}

export const textVariants = tv({
    base: 'font-sans',
    variants: {
        size: {
            lg: 'text-[length:var(--text-body-l)] leading-[var(--leading-body-l)]',
            md: 'text-[length:var(--text-body-m)] leading-[var(--leading-body-m)]',
            sm: 'text-[length:var(--text-body-s)] leading-[var(--leading-body-s)]',
            micro: 'text-[length:var(--text-micro)] leading-[var(--leading-micro)]',
        },
        tone: {
            default: 'text-foreground',
            subtle: 'text-foreground-subtle',
            muted: 'text-muted-foreground',
            subdued: 'text-subdued-foreground',
            primary: 'text-primary',
        },
    },
    defaultVariants: { size: 'md', tone: 'subtle' },
});

export interface TextProps
    extends ComponentProps<'p'>, VariantProps<typeof textVariants> {}

export function Text({ size, tone, className, ...props }: TextProps) {
    return (
        <p
            data-slot="text"
            className={twMerge(textVariants({ size, tone }), className)}
            {...props}
        />
    );
}

export function Eyebrow({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            data-slot="eyebrow"
            className={twMerge(
                'font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[0.14em] text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

export function Accent({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            data-slot="accent"
            className={twMerge('text-primary', className)}
            {...props}
        />
    );
}
