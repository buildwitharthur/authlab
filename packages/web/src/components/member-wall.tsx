import { useEffect, useState } from "react";
import type { Member } from "../types/member";
import { Accent, Eyebrow, Heading, Text } from "./ui/typography";
import { TooltipProvider } from "./ui/tooltip";
import { MemberTile } from "./member-tile";

interface MemberWallProps {
  members: Member[];
  currentMemberId?: string;
}

export function MemberWall({ members, currentMemberId }: MemberWallProps) {
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);

  useEffect(() => {
    function dismissDetails(event: PointerEvent) {
      if (
        event.target instanceof Element &&
        !event.target.closest(
          '[data-member-tile], [data-slot="tooltip-content"]',
        )
      ) {
        setActiveMemberId(null);
      }
    }

    document.addEventListener("pointerdown", dismissDetails);
    return () => document.removeEventListener("pointerdown", dismissDetails);
  }, []);

  return (
    <section
      aria-labelledby="wall-heading"
      className="pt-[var(--space-9)] pb-[var(--space-6)] min-[721px]:pt-21.5"
    >
      <div className="flex flex-col items-start justify-between gap-[var(--space-7)] min-[721px]:flex-row min-[721px]:items-end">
        <div>
          <Eyebrow>Mural</Eyebrow>
          <Heading
            id="wall-heading"
            size="display-l"
            className="mt-3.5 text-[clamp(2.2rem,4vw,4rem)]"
          >
            Quem já passou por aqui<Accent>.</Accent>
          </Heading>
        </div>
        <div className="grid shrink-0 gap-0.5 min-[721px]:text-right">
          <strong className="font-display text-[28px] font-semibold text-primary">
            {members.length}
          </strong>
          <Text size="sm" tone="muted" className="text-[11px]">
            membros no mural
          </Text>
        </div>
      </div>

      <TooltipProvider delay={160}>
        <ul
          aria-label="Membros do mural"
          className="mt-10.5 grid grid-cols-4 gap-1.5 min-[721px]:grid-cols-7 min-[721px]:gap-2 min-[1081px]:grid-cols-10"
        >
          {members.map((member) => (
            <li key={member.id} className="min-w-0">
              <MemberTile
                member={member}
                isCurrentMember={member.id === currentMemberId}
                open={activeMemberId === member.id}
                onOpenChange={(open) =>
                  setActiveMemberId((previous) =>
                    open ? member.id : previous === member.id ? null : previous,
                  )
                }
              />
            </li>
          ))}
        </ul>
      </TooltipProvider>
      <Text
        size="sm"
        tone="subdued"
        className="mt-[var(--space-4)] text-[11px]"
      >
        Passe o mouse, toque ou use Tab para conhecer alguém.
      </Text>
    </section>
  );
}
