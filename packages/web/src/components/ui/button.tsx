import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

export const buttonVariants = tv({
    base: 'inline-flex min-h-[var(--touch-target-min)] items-center justify-center gap-2 rounded-[var(--radius-md)] border font-sans text-sm font-semibold cursor-pointer transition-[transform,filter,background-color,border-color] duration-[var(--motion-fast)] focus-visible:outline-none focus-visible:shadow-focus data-[disabled]:pointer-events-none data-[disabled]:opacity-50 motion-reduce:transition-none motion-reduce:transform-none [&_svg]:size-4',
    variants: {
        variant: {
            primary:
                'border-transparent bg-[image:var(--primary-gradient)] text-primary-foreground shadow-primary hover:brightness-105 hover:-translate-y-px active:scale-96',
            secondary:
                'border-transparent bg-secondary text-secondary-foreground hover:brightness-95',
            ghost: 'border-border bg-transparent text-foreground hover:border-border-hover',
            destructive:
                'border-transparent bg-destructive text-primary-foreground hover:brightness-105',
        },
        size: {
            sm: 'px-4',
            md: 'h-13 px-6',
            lg: 'h-14 px-8',
        },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
});

export interface ButtonProps
    extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, disabled, ...props }: ButtonProps) {
    return (
        <button
            type="button"
            data-slot="button"
            data-disabled={disabled ? '' : undefined}
            disabled={disabled}
            className={twMerge(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}
