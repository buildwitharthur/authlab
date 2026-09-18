import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;

export function TooltipTrigger({ ...props }: ComponentProps<typeof BaseTooltip.Trigger>) {
    return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipContentProps = Omit<ComponentProps<typeof BaseTooltip.Popup>, 'className'> & {
    className?: string;
};

export function TooltipContent({ className, ...props }: TooltipContentProps) {
    return (
        <BaseTooltip.Portal>
            <BaseTooltip.Positioner sideOffset={10} className="z-50">
                <BaseTooltip.Popup
                    data-slot="tooltip-content"
                    className={twMerge(
                        'max-w-55 rounded-[var(--radius-sm)] bg-tooltip px-3 py-2 text-xs text-tooltip-foreground shadow-tooltip transition-opacity duration-[var(--motion-fast)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none',
                        typeof className === 'string' ? className : undefined,
                    )}
                    {...props}
                />
            </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
    );
}
