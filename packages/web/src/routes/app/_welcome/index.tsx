import { createFileRoute } from '@tanstack/react-router';
import { createRouteMetadata } from '../../../lib/route-metadata';
import { WelcomeHero } from '../../../components/welcome-hero';
import { MemberWall } from '../../../components/member-wall';
import { currentMember, members } from '../../../mocks/members';

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
    return (
        <>
            <WelcomeHero member={currentMember} />
            <MemberWall members={members} currentMemberId={currentMember.id} />
        </>
    );
}
