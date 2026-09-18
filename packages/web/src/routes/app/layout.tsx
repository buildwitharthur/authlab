import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppFooter } from '../../components/app-footer';
import { AppHeader } from '../../components/app-header';
import { AuthGuard } from '../../components/auth-guard';

export const Route = createFileRoute('/app')({
    head: () => ({ meta: [{ title: 'Área do membro | AuthLab' }] }),
    component: AppLayout,
});

function AppLayout() {
    return (
        <AuthGuard>
            <div className="flex min-h-svh flex-col bg-[radial-gradient(circle_at_82%_8%,color-mix(in_srgb,var(--brand-primary)_5%,transparent),transparent_26%)]">
                <AppHeader />
                <main className="mx-auto w-[calc(100%-28px)] max-w-[var(--container-max)] min-w-0 flex-1 pt-14 pb-15 min-[721px]:w-[calc(100%-40px)] min-[721px]:pt-20.5">
                    <Outlet />
                </main>
                <AppFooter />
            </div>
        </AuthGuard>
    );
}
