import type { Member } from '../types/member';
import { Eyebrow, Text } from './ui/typography';
import { MemberSince } from './member-since';

export function MemberSummary({ member }: { member: Member }) {
    return (
        <div className="grid content-start gap-2 min-[721px]:min-w-57.5 min-[721px]:border-l min-[721px]:border-border min-[721px]:pt-5.5 min-[721px]:pl-7.5">
            <Eyebrow>Seu número</Eyebrow>
            <strong className="font-display text-[52px] leading-none font-semibold tracking-[-0.07em] text-primary min-[721px]:text-[64px]">
                #{member.number}
            </strong>
            <Text size="sm" tone="muted">
                Membro desde <MemberSince joinedAt={member.joinedAt} />
            </Text>
        </div>
    );
}
