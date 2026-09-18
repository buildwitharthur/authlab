import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { MembersListSkeleton } from './members-list-skeleton';
import { WelcomeHeroSkeleton } from './welcome-hero-skeleton';

export interface AppSkeletonProps extends ComponentProps<'div'> {}

// Renderizar no espaço do Outlet durante o carregamento, mantendo header e footer.
export function AppSkeleton({ className, ...props }: AppSkeletonProps) {
    return (
        <div
            role="status"
            aria-label="Carregando o app"
            data-slot="app-skeleton"
            className={twMerge('w-full min-w-0', className)}
            {...props}
        >
            <span className="sr-only">
                Carregando seu perfil e o mural de membros…
            </span>
            <WelcomeHeroSkeleton />
            <MembersListSkeleton />
        </div>
    );
}
