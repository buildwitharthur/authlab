import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

export const statusDotVariants = tv({
  base: "inline-block size-2 shrink-0 rounded-full ring-4",
  variants: {
    status: {
      success: "bg-success ring-success/10",
      warning: "bg-warning ring-warning/10",
      danger: "bg-destructive ring-destructive/10",
      neutral: "bg-muted-foreground ring-muted-foreground/10",
    },
  },
  defaultVariants: { status: "success" },
});

export interface StatusDotProps
  extends ComponentProps<"span">, VariantProps<typeof statusDotVariants> {}

export function StatusDot({ status, className, ...props }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="status-dot"
      className={twMerge(statusDotVariants({ status }), className)}
      {...props}
    />
  );
}
