import { createFileRoute, Link, Navigate, Outlet } from '@tanstack/react-router';
import { createRouteMetadata } from '../../lib/route-metadata';
import { Card } from '../../components/ui/card';
import { Accent, Eyebrow, Heading, Text } from '../../components/ui/typography';
import { Skeleton } from '../../components/ui/skeleton';
import { useProfile } from '../../api/hooks/useProfile';
import { useGetMembersCount } from '../../api/hooks/useGetMembersCount';

export const Route = createFileRoute('/_auth')({
    head: () =>
        createRouteMetadata({
            title: 'Acesse sua conta | AuthLab',
            description: 'Entre ou crie sua conta no AuthLab para fazer parte do mural de membros.',
        }),
    component: AuthLayout,
});

function AuthLayout() {
    const { data: membersCount } = useGetMembersCount();
    const { isLoading, data: user } = useProfile();

    if (isLoading) return null;

    if (user) return <Navigate to="/app" />;

    return (
        <div className="min-h-svh bg-[radial-gradient(circle_at_82%_8%,color-mix(in_srgb,var(--brand-primary)_5%,transparent),transparent_26%)]">
            <header className="mx-auto flex h-21.5 w-[calc(100%-28px)] max-w-[var(--container-max)] items-center justify-between gap-4 border-b border-border min-[721px]:w-[calc(100%-40px)]">
                <Link
                    to="/"
                    aria-label="AuthLab — início"
                    className="inline-flex min-h-[var(--touch-target-min)] items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:shadow-focus"
                >
                    <img
                        src="/arthur-labs-logo.png"
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </Link>
            </header>

            <main className="mx-auto grid min-h-[calc(100svh-86px)] w-[calc(100%-28px)] max-w-[var(--container-max)] items-center gap-14.5 pt-13.5 pb-19.5 min-[721px]:w-[calc(100%-40px)] min-[721px]:pt-19 min-[721px]:pb-26 min-[1081px]:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.65fr)] min-[1081px]:gap-24">
                <section aria-labelledby="auth-heading" className="min-w-0">
                    <Eyebrow>AuthLab / ArthurLabs</Eyebrow>
                    <Heading
                        as="h1"
                        id="auth-heading"
                        size="display-xl"
                        className="mt-4.5 max-w-190 text-[clamp(3rem,16vw,5rem)] leading-[0.91] tracking-[-0.06em] min-[721px]:text-[clamp(3.5rem,6.1vw,6.8rem)]"
                    >
                        Entre. Faça parte. <Accent>Fique no mural.</Accent>
                    </Heading>
                    <Text size="lg" className="mt-7.5 max-w-147.5 text-base leading-[1.75]">
                        Um experimento de autenticação web construído em público. Crie sua conta,
                        receba as boas-vindas e entre para o mosaico.
                    </Text>
                    <div className="mt-[var(--space-8)] flex max-w-105 items-center gap-4.5 border-t border-border pt-[var(--space-5)]">
                        {membersCount ? (
                            <strong className="font-display text-[34px] tracking-[-0.06em] text-primary">
                                {membersCount.count}
                            </strong>
                        ) : (
                            <Skeleton className="h-8.5 w-14" />
                        )}
                        <div className="grid gap-1">
                            <Text size="sm" tone="default" className="text-[13px] font-semibold">
                                pessoas já entraram
                            </Text>
                            <Text size="sm" tone="muted">
                                Seu lugar pode ser o próximo.
                            </Text>
                        </div>
                    </div>
                </section>

                <Card className="w-full min-w-0 max-w-150 justify-self-start min-[721px]:p-2.5 min-[1081px]:max-w-127.5 min-[1081px]:justify-self-end">
                    <nav
                        aria-label="Autenticação"
                        className="grid grid-cols-2 gap-1.5 border-b border-border px-1 pt-1 pb-[var(--space-4)]"
                    >
                        <Link
                            to="/create-account"
                            activeOptions={{ exact: true }}
                            className="flex min-h-[var(--touch-target-min)] items-center justify-center rounded-[var(--radius-md)] px-4 text-sm text-muted-foreground transition-colors duration-[var(--motion-fast)] focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none"
                            activeProps={{
                                className: 'bg-secondary text-secondary-foreground',
                                'aria-current': 'page',
                            }}
                        >
                            Criar conta
                        </Link>
                        <Link
                            to="/"
                            activeOptions={{ exact: true }}
                            className="flex min-h-[var(--touch-target-min)] items-center justify-center rounded-[var(--radius-md)] px-4 text-sm text-muted-foreground transition-colors duration-[var(--motion-fast)] focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none"
                            activeProps={{
                                className: 'bg-secondary text-secondary-foreground',
                                'aria-current': 'page',
                            }}
                        >
                            Entrar
                        </Link>
                    </nav>
                    <div className="min-w-0 px-4 pt-6 pb-4.5 min-[721px]:p-7.5">
                        <Outlet />
                    </div>
                </Card>
            </main>
        </div>
    );
}
