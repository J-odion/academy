import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { NavigationMenus } from "@/components/parts/Menus";
import Link from 'next/link';

export default function Headers() {
    return (
        <div className='relative bg-none flex w-full items-center h-[50px] align-middle justify-between px-[100px] py-[50px]'>
            <Link href='/dashboard/admin/account'>
            <Image className="h-[50px] w-[50px]"
                src="/SGALOGO.svg"
                width={50}
                height={50}
                alt="Picture of the author"
            />
            </Link>
            <NavigationMenus  />
            <div className="bg-none z-99 font-[400] text-[14px] text-white gap-8 flex items-center ">
            <Link href='/auth/login'>Login</Link>
            <Button className="bg-brown h-[35px] w-[auto] rounded-2xl p-[15px] text-[14px] items-center justify-center"><Link href="/auth/signup">Join Now</Link></Button>
            </div>
        </div>
    )
}
