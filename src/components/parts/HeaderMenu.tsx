import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { X, AlignJustify, UserCircle } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavigationMenus } from "@/components/parts/Menus";
import { Avatar } from "@/components/ui/avatar";

type Props = {
  toggleSideBar: boolean;
  setToggleSideBar: (toggleSideBar: boolean) => void;
};

const DashboardNav = ({ toggleSideBar, setToggleSideBar }: Props) => {
  // const router = useRouter();
  const { route } = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogoutModal = () => {
    setOpen(!open);
  };

  // const handleLogout = () => {
  //   router.push("/");
  // }

  const handleToggleSidebar = () => setToggleSideBar(!toggleSideBar);

  return (
    <>
      <nav className=" top-0 z-40 w-full px-5 py-6 text-black md:px-10 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Link href='/auth/signup/adminSignup' className='cursor-pointer'>
            <Image
              className="h-[50px] w-[50px]"
              src="/SGALOGO.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            </Link>
          </div>
          <div className="hidden  bg-none flex-1 lg:flex w-full items-center h-[50px] align-middle justify-between px-[100px] py-[50px]">
          <Link href='/auth/signup/adminSignup' className='cursor-pointer'>
            <Image
              className="h-[50px] w-[50px]"
              src="/SGALOGO.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            </Link>
            <NavigationMenus />
            <div className="bg-none z-99 font-[400] text-[14px] text-white gap-8 flex items-center ">
              <Link href="/auth/login">Login</Link>
              <Button className="bg-brown h-[35px] w-[auto] rounded-2xl p-[15px] text-[14px] items-center justify-center">
                <Link href="/auth/signup">Join Now</Link>
              </Button>
            </div>
          </div>
          <div className="flex fixed lg:hidden p-2 right-5 rounded-xl bg-black justify-end items-end space-x-6">
            <div
              className="cursor-pointer lg:hidden "
              onClick={handleToggleSidebar}
            >
              {toggleSideBar ? (
                <X
                  color="white"
                  className=" align-middle justify-end items-end "
                />
              ) : (
                <AlignJustify color="white" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <aside
        className={`transition-width  fixed z-40 flex top-0 h-[100%] bg-[#000] shadow-lg duration-300 ease-in-out lg:hidden`}
      >
        {toggleSideBar && (
          <div className="flex flex-col pt-4 ">
            <div className="flex items-center gap-3 justify-center h-20">
              <Link href="/">
                <Avatar>
                  <Image
                    className="h-[50px] w-[50px]"
                    src="/SGALOGO.svg"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                  />
                </Avatar>
              </Link>
              <h1 className="text-2xl font-bold">SGA</h1>
            </div>
            <ul className="w-60 pt-10 text-[#959190]">
              <Link href="/">
                <li
                  className={
                    route === "/"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#E89222]"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#E89222] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <h3 className=" text-lg justify-center flex items-center">
                    Home
                  </h3>
                </li>
              </Link>

              <Link href="#mission">
                <li
                  className={
                    route === "#mission"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#E89222]"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#E89222] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex justify-center items-center">
                    Mission
                  </div>
                </li>
              </Link>

              <Link href="#explore">
                <li
                  className={
                    route === "#explore"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#E89222]"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#E89222] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex justify-center items-center">
                    Explore
                  </div>
                </li>
              </Link>

              <Link href="#about">
                <li
                  className={
                    route === "#about"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#E89222]"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#E89222] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex justify-center items-center">About</div>
                </li>
              </Link>
            </ul>

            <div
              className="fixed bottom-10 pl-10 flex flex-col items-center space-y-4 text-[#959190]"
              style={{ cursor: "pointer" }}
            >
              <Link href="/auth/login" className="flex items-center">
                <span className="mr-3">
                  <UserCircle size="20" />
                </span>
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center"
                onClick={handleLogoutModal}
              >
                Join For Free
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default DashboardNav;
