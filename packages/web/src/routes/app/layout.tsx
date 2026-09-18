import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { createRouteMetadata } from '../../lib/route-metadata';
import { AppFooter } from '../../components/app-footer';
import { AppHeader } from '../../components/app-header';
import { AppSkeleton } from '#/components/app-skeleton';
import { useProfile } from '../../api/hooks/useProfile';

export const Route = createFileRoute('/app')({
    head: () =>
        createRouteMetadata({
            title: 'Área do membro | AuthLab',
            description: 'Acesse sua área de membro e acompanhe a comunidade AuthLab.',
            noIndex: true,
        }),
    component: AppLayout,
});

function AppLayout() {
    const { isLoading, data: user } = useProfile({ query: { retry: false } });

    if (isLoading) return <AppSkeleton />;

    if (!user) return <Navigate to="/" />;

    return (
        <div className="flex min-h-svh flex-col bg-[radial-gradient(circle_at_82%_8%,color-mix(in_srgb,var(--brand-primary)_5%,transparent),transparent_26%)]">
            <AppHeader />
            <main className="mx-auto w-[calc(100%-28px)] max-w-[var(--container-max)] min-w-0 flex-1 pt-14 pb-15 min-[721px]:w-[calc(100%-40px)] min-[721px]:pt-20.5">
                <Outlet />
            </main>
            <AppFooter />
        </div>
    );
}
