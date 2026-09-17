import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={twMerge(
        "rounded-[var(--radius-xl)] border border-border bg-surface/75 p-2 backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={twMerge("grid gap-2", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={twMerge("grid gap-4 p-[var(--space-5)]", className)}
      {...props}
    />
  );
}
