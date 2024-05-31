import React from "react";
import { cn } from "@/lib/utils";

interface TypographyH2Props extends React.ComponentProps<"h2"> {
  className?: string;
  children: React.ReactNode;
}

function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2
      className={cn("text-2xl font-bold lg:text-left lg:text-3xl", className)}
    >
      {children}
    </h2>
  );
}

export default TypographyH2;
