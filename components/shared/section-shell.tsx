import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="section-shell">{children}</div>
    </section>
  );
}
