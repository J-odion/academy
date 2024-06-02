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
    width: 600,
    height: 350,
  },
  forgotPassword: {
    image: `${imagePath}/guitar_bg.png`,
    width: 500,
    height: 600,
  },
  emailVerification: {
    image: `${imagePath}/guitar_bg.png`,
    width: 600,
    height: 600,
  },
  resetPassword: {
    image: `${imagePath}/guitar_bg.png`,
    width: 600,
    height: 600,
  },
  signUp: {
    image: `${imagePath}/guitar_bg.png`,
    className: "m-0 p-0",
    width: 700,
    height: 350,
  },
  emailPasswordReset: {
    image: `${imagePath}/guitar_bg.png`,
    width: 600,
    height: 600,
  },
};

function AuthLayout({ children, page }: AuthLayoutProps) {
  const router = useRouter();
  const currentPageInfo = authInfo[page];




  return (
    <main className="mx-auto grid lg:h-screen lg:grid-cols-12">
      {children}
      <section className="col-span-6 lg:block hidden">
        <div className="p-5 lg:px-24">
          <Image src={currentPageInfo.image} width={currentPageInfo.width} height={currentPageInfo.height} alt="Guitar" className="" />
        </div>
      </section>

    </main>
  );
}

export default AuthLayout;
