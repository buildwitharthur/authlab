import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends ComponentProps<'input'> {}

export function Input({ className, disabled, ...props }: InputProps) {
    return (
        <input
            data-slot="input"
            data-disabled={disabled ? '' : undefined}
            disabled={disabled}
            className={twMerge(
                'h-13 w-full rounded-[var(--radius-md)] border border-input bg-surface px-4 font-sans text-sm text-foreground placeholder:text-placeholder transition-[border-color,background-color,box-shadow] duration-[var(--motion-fast)] focus-visible:outline-none focus-visible:border-primary focus-visible:bg-surface-raised focus-visible:shadow-focus aria-invalid:border-destructive data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 motion-reduce:transition-none',
                className,
            )}
            {...props}
        />
    );
}
