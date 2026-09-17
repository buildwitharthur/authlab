import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps extends ComponentProps<"div"> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={twMerge(
        "animate-pulse rounded-[var(--radius-sm)] bg-foreground/5 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
