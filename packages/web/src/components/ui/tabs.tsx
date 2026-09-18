import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type TabsProps = Omit<ComponentProps<typeof BaseTabs.Root>, 'className'> & {
    className?: string;
};
type TabsListProps = Omit<ComponentProps<typeof BaseTabs.List>, 'className'> & {
    className?: string;
};
type TabsTriggerProps = Omit<ComponentProps<typeof BaseTabs.Tab>, 'className'> & {
    className?: string;
};
type TabsContentProps = Omit<ComponentProps<typeof BaseTabs.Panel>, 'className'> & {
    className?: string;
};

export function Tabs({ className, ...props }: TabsProps) {
    return (
        <BaseTabs.Root
            data-slot="tabs"
            className={twMerge('w-full', typeof className === 'string' ? className : undefined)}
            {...props}
        />
    );
}

export function TabsList({ className, ...props }: TabsListProps) {
    return (
        <BaseTabs.List
            data-slot="tabs-list"
            className={twMerge(
                'flex gap-1 border-b border-border p-1',
                typeof className === 'string' ? className : undefined,
            )}
            {...props}
        />
    );
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
    return (
        <BaseTabs.Tab
            data-slot="tabs-trigger"
            className={twMerge(
                'min-h-[var(--touch-target-min)] flex-1 cursor-pointer rounded-[var(--radius-md)] px-4 font-sans text-sm text-muted-foreground transition-colors duration-[var(--motion-fast)] data-[active]:bg-secondary data-[active]:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none',
                typeof className === 'string' ? className : undefined,
            )}
            {...props}
        />
    );
}

export function TabsContent({ className, ...props }: TabsContentProps) {
    return (
        <BaseTabs.Panel
            data-slot="tabs-content"
            className={twMerge(
                'focus-visible:outline-none focus-visible:shadow-focus',
                typeof className === 'string' ? className : undefined,
            )}
            {...props}
        />
    );
}
