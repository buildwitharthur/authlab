import { Skeleton } from "./ui/skeleton";

export function WelcomeHeroSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid gap-11.5 border-b border-border pb-15 min-[721px]:min-h-90 min-[721px]:grid-cols-[minmax(0,1fr)_auto] min-[721px]:gap-17.5"
    >
      <div className="min-w-0">
        <Skeleton className="h-3 w-36" />
        <div className="mt-4.5 grid max-w-212.5 gap-3">
          <Skeleton className="h-[clamp(2.9rem,5.5vw,5.8rem)] w-full" />
          <Skeleton className="h-[clamp(2.9rem,5.5vw,5.8rem)] w-3/4" />
        </div>
        <div className="mt-6.5 grid max-w-167.5 gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/2 min-[1081px]:hidden" />
        </div>
      </div>
      <div className="grid content-start gap-2 min-[721px]:min-w-57.5 min-[721px]:border-l min-[721px]:border-border min-[721px]:pt-5.5 min-[721px]:pl-7.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-13 w-28 min-[721px]:h-16" />
        <Skeleton className="h-4 w-44" />
      </div>
    </div>
  );
}
