import { cn } from "@/lib/utils";
import React from "react";

interface TypographyH1Props extends React.ComponentProps<"h1"> {
  className?: string;
  children: React.ReactNode;
}

function TypographyH1({ children, className }: TypographyH1Props) {
  return (
    <h1
      className={`text-3xl font-bold tracking-tight lg:text-4xl ${cn(
        className,
      )}`}
    >
      {children}
    </h1>
  );
}

export default TypographyH1;
