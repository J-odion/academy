import { cn } from "@/lib/utils";
import React from "react";

type AuthSectionProps = React.PropsWithChildren & {
  className?: string;
};

function AuthSection({ children, className }: AuthSectionProps) {
  return (
    <section
      className={`col-span-6 flex items-center justify-center ${className}`}
    >
      <div

      >
        {children}
      </div>
    </section>
  );
}

export default AuthSection;
