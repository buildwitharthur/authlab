import type { Member } from '../types/member';
import { Accent, Eyebrow, Heading, Text } from './ui/typography';
import { MemberSummary } from './member-summary';

export function WelcomeHero({ member }: { member: Member }) {
    return (
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
                    {member.name.split(' ')[0]}, obrigado por entrar. Cada pessoa abaixo chegou aqui
                    em um momento diferente, mas todas passaram pela mesma porta.
                </Text>
            </div>
            <MemberSummary member={member} />
        </section>
    );
}
