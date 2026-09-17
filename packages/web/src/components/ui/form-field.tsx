import { useId, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Input, type InputProps } from "./input";

export interface FormFieldProps extends InputProps {
  label: ReactNode;
  description?: string;
  error?: string;
  containerClassName?: string;
}

export function FormField({
  id,
  label,
  description,
  error,
  containerClassName,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const describedBy =
    [props["aria-describedby"], (error || description) && messageId]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div
      data-slot="form-field"
      className={twMerge("grid gap-2", containerClassName)}
    >
      <label
        data-slot="field-label"
        htmlFor={inputId}
        className="font-sans text-xs font-medium text-foreground-subtle"
      >
        {label}
      </label>
      <Input
        {...props}
        id={inputId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
      />
      {(error || description) && (
        <p
          data-slot="field-message"
          id={messageId}
          role={error ? "alert" : undefined}
          className={twMerge(
            "text-xs text-muted-foreground",
            error && "text-destructive",
          )}
        >
          {error || description}
        </p>
      )}
    </div>
  );
}
