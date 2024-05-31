import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavigationMenus } from "@/components/parts/Menus";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="lg:h-[300px] gap-6 rounded-tr-[80px] bg-[#F0EAE8] flex flex-col w-full items-center align-middle justify-center px-10 lg:px-[100px] py-[50px]">
      <div className="w-full lg:w-[90%] justify-between flex flex-col lg:flex-row bg-none z-99 font-[400] text-[14px] text-white gap-12 items-center ">
        <Image
          className="h-[90px] w-[90px] lg:h-[100px] lg:w-[100px]"
          src="/SGALOGO.svg"
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <div className="hidden lg:flex flex-col ">
          <h3 className="text-lg font-bold text-[#000000] ">Features</h3>
          <Link className="text-[#000000]" href="">
            Free Lessons
          </Link>
          <Link className="text-[#000000]" href="">
            Premium Courses
          </Link>
          <Link className="text-[#000000]" href="">
            Categories
          </Link>
          <Link className="text-[#000000]" href="">
            Community
          </Link>
        </div>

        <div className="hidden lg:flex flex-col ">
          <h3 className="text-lg font-bold text-[#000000] ">Support</h3>
          <Link className="text-[#000000]" href="">
            FAQ
          </Link>
          <Link className="text-[#000000]" href="">
            Contact Us
          </Link>
          <Link className="text-[#000000]" href="">
            About
          </Link>
          <Link className="text-[#000000]" href="">
            Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col gap-3 ">
          <h3 className="text-lg font-bold text-[#000000] ">Social Media</h3>
          <div className="flex gap-10 lg:flex-col lg:gap-0">
            <div className="flex gap-3 ">
              <Image
                className="h-[20px] w-[20px]"
                src="/images/social-icons/facebook.svg"
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <Link className="text-[#000000]" href="https://facebook.com/oc.spicyjazzy" target="blank">
                Facebook
              </Link>
            </div>
            <div className="flex gap-3">
              <Image
                className="h-[20px] w-[20px]"
                src="/images/social-icons/youtube.svg"
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <Link className="text-[#000000]" href="https://www.youtube.com/channel/UCPiHCDyWuELnEljRENTrp5w" target="blank">
                YouTube
              </Link>
            </div>
          </div>
          <div className=" flex gap-10 lg:flex-col lg:gap-0">
            <div className="flex gap-3">
              <Image
                className="h-[20px] w-[20px]"
                src="/images/social-icons/instagram.svg"
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <Link className="text-[#000000]" href="https://instagram.com/oc_spicyjazzy" target="blank">
                Instagram
              </Link>
            </div>
            <div className="flex gap-3">
              <Image
                className="h-[20px] w-[20px]"
                src="/images/social-icons/x.svg"
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <Link className="text-[#000000]" href="https://twitter.com/" target="blank">
                Twitter
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-[#000000] ">Lessons</h3>
          <div className="flex flex-row gap-10 lg:flex-col lg:gap-0">
            <Image
              className="h-[40px] w-[100px]"
              src="/images/googleplay.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <Image
              className="h-[40px] w-[100px]"
              src="/images/apple.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex-col flex lg:flex w-full lg:w-[90%] gap-8 lg:gap-2 justify-center items-center">
        <div className="h-[2px] w-full lg:w-[70%] bg-black bg-opacity-45"></div>
        <p className="text-[13px]">
          © Spicy Guitar Academy 2024. All rights reserved.
        </p>
      </div>
    </div>
  );
}
