import { createFileRoute } from '@tanstack/react-router';
import { createRouteMetadata } from '../../../lib/route-metadata';
import { MembersList } from '../../../components/members-list';

import { useProfile } from '../../../api/hooks/useProfile';
import { Accent, Eyebrow, Heading, Text } from '#/components/ui/typography';

export const Route = createFileRoute('/app/_welcome/')({
    head: () =>
        createRouteMetadata({
            title: 'Mural de membros | AuthLab',
            description: 'Veja seu lugar no AuthLab e conheça as pessoas que fazem parte do mural.',
            noIndex: true,
        }),
    component: WelcomePage,
});

function WelcomePage() {
    const { data: user } = useProfile();

    return (
        <>
            <section
                aria-labelledby="welcome-heading"
                className="grid gap-11.5 border-b border-border pb-15 min-[721px]:min-h-90 min-[721px]:grid-cols-[minmax(0,1fr)_auto] min-[721px]:gap-17.5"
            >
                <div className="min-w-0">
                    <Eyebrow>Seu lugar no AuthLab</Eyebrow>
                    <Heading
                        as="h1"
                        id="welcome-heading"
                        size="display-xl"
                        className="mt-4.5 max-w-212.5 text-[clamp(3.2rem,6vw,6.3rem)] leading-[0.92] tracking-[-0.06em]"
                    >
                        Você agora faz parte disso<Accent>.</Accent>
                    </Heading>
                    <Text className="mt-6.5 max-w-167.5 text-base leading-[1.75]">
                        {user?.name.split(' ')[0]}, obrigado por entrar. Cada pessoa abaixo chegou
                        aqui em um momento diferente, mas todas passaram pela mesma porta.
                    </Text>
                </div>
                <div className="grid content-start gap-2 min-[721px]:min-w-57.5 min-[721px]:border-l min-[721px]:border-border min-[721px]:pt-5.5 min-[721px]:pl-7.5">
                    <Eyebrow>Seu número</Eyebrow>
                    <strong className="font-display text-[52px] leading-none font-semibold tracking-[-0.07em] text-primary min-[721px]:text-[64px]">
                        #{user?.memberNumber}
                    </strong>
                    <Text size="sm" tone="muted">
                        Membro desde{' '}
                        <time dateTime={user?.joinedAt}>
                            {new Intl.DateTimeFormat('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                timeZone: 'UTC',
                            }).format(new Date(user!.joinedAt))}
                        </time>
                    </Text>
                </div>
            </section>
            <MembersList currentMemberId={user?.id} />
        </>
    );
}
