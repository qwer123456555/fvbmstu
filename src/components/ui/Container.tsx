import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("container mx-auto px-4 md:px-6 max-w-[1400px]", className)}>
      {children}
    </div>
  );
}
