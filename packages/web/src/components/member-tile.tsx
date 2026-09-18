import type { Member } from '../types/member';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { MemberSince } from './member-since';

interface MemberTileProps {
    member: Member;
    isCurrentMember?: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MemberTile({
    member,
    isCurrentMember = false,
    open,
    onOpenChange,
}: MemberTileProps) {
    const initials = member.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toLocaleUpperCase('pt-BR');
    return (
        <Tooltip open={open} onOpenChange={onOpenChange}>
            <TooltipTrigger
                data-member-tile=""
                data-current={isCurrentMember ? '' : undefined}
                closeOnClick={false}
                onClick={() => onOpenChange(true)}
                aria-label={`${member.name}, membro ${member.number}${isCurrentMember ? ', você' : ''}`}
                className="relative block aspect-square min-h-[var(--touch-target-min)] w-full cursor-pointer rounded-[var(--radius-md)] border border-border bg-surface text-foreground-subtle transition-[transform,background-color,border-color,color] duration-[var(--motion-base)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:shadow-focus data-[popup-open]:-translate-y-0.5 data-[popup-open]:border-primary data-[popup-open]:bg-primary data-[popup-open]:text-primary-foreground data-[current]:border-primary data-[current]:bg-primary data-[current]:text-primary-foreground motion-reduce:transform-none motion-reduce:transition-none"
            >
                <span aria-hidden="true" className="absolute top-2 right-2 text-[9px] opacity-55">
                    #{String(member.number).padStart(2, '0')}
                </span>
                <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-2 font-display text-sm font-semibold tracking-[-0.05em] min-[721px]:bottom-2.5 min-[721px]:left-3 min-[721px]:text-lg"
                >
                    {initials}
                </span>
            </TooltipTrigger>
            <TooltipContent>
                <strong className="block text-[11px]">
                    {member.name}
                    {isCurrentMember ? ' · você' : ''}
                </strong>
                <span className="mt-1 block text-[10px] text-subdued-foreground">
                    Membro desde <MemberSince joinedAt={member.joinedAt} />
                </span>
            </TooltipContent>
        </Tooltip>
    );
}
