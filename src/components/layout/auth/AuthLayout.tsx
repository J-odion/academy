/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useEffect } from "react";
import { TypographyH2 } from "../../typography";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
// import { useAuth } from "@/context/auth.context";

type PageInfo = {
  description?: string;
  image: string;
  title?: string;
  width?: number;
  height?: any;
  className?: string;
};

type AuthPage =
  | "signUp"
  | "signIn"
  | "forgotPassword"
  | "resetPassword"
  | "emailVerification"
  | "emailPasswordReset";

type AuthInfo = Record<AuthPage, PageInfo>;

type AuthLayoutProps = React.PropsWithChildren & {
  page: AuthPage;
};

const imagePath = "/images";

const authInfo: AuthInfo = {
  signIn: {
    image: `${imagePath}/guitar_bg.png`,
    
  },
  forgotPassword: {
    image: `${imagePath}/guitar_bg.png`,
    
  },
  emailVerification: {
    image: `${imagePath}/guitar_bg.png`,
    
  },
  resetPassword: {
    image: `${imagePath}/guitar_bg.png`,
   
  },
  signUp: {
    image: `${imagePath}/guitar_bg.png`,
    className: "m-0 p-0",
    
  },
  emailPasswordReset: {
    image: `${imagePath}/guitar_bg.png`,
    
  },
};

function AuthLayout({ children, page }: AuthLayoutProps) {
  const router = useRouter();
  const currentPageInfo = authInfo[page];




  return (
    <main className="h-[100vh] mx-auto flex flex-col justify-center w-full my-auto lg:grid lg:h-screen lg:grid-cols-12">
      {children}
      <section className="col-span-6 justify-center my-auto object-contain ">
        <div className="p-5 lg:px-24 hidden lg:flex justify-center align-middle items-center lg:h-[100vh] my-auto">
          <Image  src={currentPageInfo.image} width={600} height={500} alt="Guitar" className="scale-75 " />
        </div>
      </section>

    </main>
  );
}

export default AuthLayout;
