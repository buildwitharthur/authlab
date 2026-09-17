import { type PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";

export const Integrations = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};
