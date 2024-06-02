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
      <div className="w-full px-6 lg:px-20 align-middle lg:h-[100vh] my-auto h-full flex flex-col justify-center"
      >
        {children}
      </div>
    </section>
  );
}

export default AuthSection;
