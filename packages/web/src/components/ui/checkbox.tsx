import { useId, type ComponentProps, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<
    ComponentProps<'input'>,
    'type' | 'children'
> {
    label: ReactNode;
    description?: string;
}

export function Checkbox({
    id,
    label,
    description,
    className,
    disabled,
    ...props
}: CheckboxProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const describedBy =
        [props['aria-describedby'], description && `${inputId}-description`]
            .filter(Boolean)
            .join(' ') || undefined;
    return (
        <label
            data-slot="checkbox"
            htmlFor={inputId}
            data-disabled={disabled ? '' : undefined}
            className="flex min-h-[var(--touch-target-min)] cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-border p-4 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
        >
            <input
                {...props}
                type="checkbox"
                id={inputId}
                disabled={disabled}
                aria-describedby={describedBy}
                className={twMerge(
                    'mt-0.5 size-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:shadow-focus',
                    className,
                )}
            />
            <span className="grid gap-1">
                <span className="text-xs font-medium text-foreground">
                    {label}
                </span>
                {description && (
                    <span
                        id={`${inputId}-description`}
                        className="text-xs leading-relaxed text-muted-foreground"
                    >
                        {description}
                    </span>
                )}
            </span>
        </label>
    );
}
