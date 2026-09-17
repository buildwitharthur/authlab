import { Skeleton } from "./ui/skeleton";

const placeholderIds = Array.from(
  { length: 40 },
  (_, index) => `member-placeholder-${index}`,
);

export function MemberWallSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="pt-[var(--space-9)] pb-[var(--space-6)] min-[721px]:pt-21.5"
    >
      <div className="flex flex-col items-start justify-between gap-[var(--space-7)] min-[721px]:flex-row min-[721px]:items-end">
        <div className="w-full min-w-0 max-w-160">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-3.5 h-[clamp(2.2rem,4vw,4rem)] w-full" />
        </div>
        <div className="grid shrink-0 gap-2 min-[721px]:justify-items-end">
          <Skeleton className="h-7 w-12" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <div className="mt-10.5 grid grid-cols-4 gap-1.5 min-[721px]:grid-cols-7 min-[721px]:gap-2 min-[1081px]:grid-cols-10">
        {placeholderIds.map((id) => (
          <Skeleton
            key={id}
            className="aspect-square min-h-[var(--touch-target-min)] rounded-[var(--radius-md)] border border-border"
          />
        ))}
      </div>
      <Skeleton className="mt-[var(--space-4)] h-3 w-72 max-w-full" />
    </div>
  );
}
