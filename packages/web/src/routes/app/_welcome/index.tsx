import { createFileRoute } from '@tanstack/react-router';
import { createRouteMetadata } from '../../../lib/route-metadata';
import { WelcomeHero } from '../../../components/welcome-hero';
import { MemberWall } from '../../../components/member-wall';
import { MemberWallSkeleton } from '../../../components/member-wall-skeleton';
import { useProfile } from '../../../api/hooks/useProfile';
import { useListMembers } from '../../../api/hooks/useListMembers';
import type { Member } from '../../../types/member';

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
    const { data: wallMembers, isLoading } = useListMembers();

    if (!user) return null;

    const currentMember: Member = {
        id: user.id,
        name: user.name,
        number: user.memberNumber,
        joinedAt: user.joinedAt,
    };

    if (isLoading || !wallMembers) {
        return (
            <>
                <WelcomeHero member={currentMember} />
                <MemberWallSkeleton />
            </>
        );
    }

    const members: Member[] = wallMembers.map((member) => ({
        id: member.id,
        name: member.name,
        number: member.memberNumber,
        joinedAt: member.joinedAt,
    }));

    return (
        <>
            <WelcomeHero member={currentMember} />
            <MemberWall members={members} currentMemberId={currentMember.id} />
        </>
    );
}
