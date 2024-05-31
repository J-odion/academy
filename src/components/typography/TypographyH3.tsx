import React from "react";
import { cn } from "@/lib/utils";

interface TypographyH3Props extends React.ComponentProps<"h3"> {
  className?: string;
  children: React.ReactNode;
}

function TypographyH3({ children, className }: TypographyH3Props) {
  return (
    <h3
      className={cn(
        "text-[20px] font-bold md:text-left md:text-[22px]",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export default TypographyH3;
