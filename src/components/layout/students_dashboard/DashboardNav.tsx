import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@/components/ui/input'
import { Search, X, AlignJustify, PieChart, BookOpen, BookText, ShoppingBag, Users, MessageCircle, UserCircle, LogOut } from 'lucide-react'
import NotificationModal from './NotificationModal'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LogoutModal from '@/components/modal/student_dashboard/LogoutModal'


const notifications = {
  count: 2,
  results: [
      {
          id: 1,
          message: "New message from admin",
          is_read: false,
          created_at: "2022-02-02T12:00:00Z",
      },
      {
          id: 2,
          message: "New message from admin",
          is_read: false,
          created_at: "2022-02-02T12:00:00Z",
      },
  ],
}



type Props = {
  page: string;
  toggleSideBar: boolean;
  setToggleSideBar: (toggleSideBar: boolean) => void;
};


const DashboardNav = ({page, toggleSideBar, setToggleSideBar}: Props) => {
  // const router = useRouter();
  const { route } = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogoutModal = () => {
    setOpen(!open);
}

  // const handleLogout = () => {
  //   router.push("/");
  // }

  const handleToggleSidebar = () => setToggleSideBar(!toggleSideBar);


  return (
    <>
      <nav className="fixed top-0 z-40 lg:ml-72 w-full px-5 py-6 bg-white text-black md:px-10 lg:py-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-normal capitalize text-[#1C1C1C66]">{page}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex">
              <Search size="20" />
              <Input
                type="text"
                placeholder="Search"
                className="w-96"
              />
            </div>
            <NotificationModal
              notifications={notifications}
              notificationRefetch={() => {}}
            />
            <div className="cursor-pointer lg:hidden" onClick={handleToggleSidebar}>
              {toggleSideBar ? <X /> : <AlignJustify />}
            </div>
          </div>
        </div>
        {/* <div className="flex lg:hidden justify-between items-center">
          <h1 className="text-2xl capitalize font-bold">{page}</h1>
          <div className="cursor-pointer" onClick={handleToggleSidebar}>
            {toggleSideBar ? <X /> : <AlignJustify />}
          </div>
        </div> */}
      </nav>

      {/* Mobile sidebar */}
      <aside
        className={`transition-width fixed z-40 flex h-screen bg-[#fff] shadow-lg duration-300 ease-in-out lg:hidden`}
      >
        {toggleSideBar && (
          <div className='flex flex-col pt-4 '>
            <div className="flex items-center gap-3 justify-center h-20">
            <Link href='/dashboard/student/account/profile'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <h1 className="text-2xl font-bold">Student</h1>
            </div>
            <ul className="w-60 pt-10 text-[#959190]">
              <Link href="/dashboard/student/account">
                <li
                  className={
                    route === "/dashboard/student/account"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                    <div className="flex items-center">
                      <span className="mr-3">
                        <PieChart size="20" />
                      </span>
                      Dashboard
                    </div>
                  </li>
              </Link>

              <Link href="/dashboard/dashboard/courses">
                <li
                  className={
                    route === "/dashboard/student/courses"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookOpen size="20" />
                    </span>
                    Course(s)
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/shoppers">
                <li
                  className={
                    route === "/dashboard/student/shoppers"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookText size="20" />
                    </span>
                    Shoppers
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/curriculum">
                <li
                  className={
                    route === "/dashboard/student/curriculum"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookText size="20" />
                    </span>
                    Curriculum
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/chat-forum">
                <li
                  className={
                    route === "/dashboard/student/chat-forum"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <ShoppingBag size="20" />
                    </span>
                    Chat Forum
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/transactions">
                <li
                  className={
                    route === "/dashboard/student/transactions"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <Users size="20" />
                    </span>
                    Transactions
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/subscription-plans">
                <li
                  className={
                    route === "/dashboard/student/subscription-plans"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <MessageCircle size="20" />
                    </span>
                    Subscription Plans
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/support">
                <li
                  className={
                    route === "/dashboard/student/support"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-white"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <MessageCircle size="20" />
                    </span>
                    Support
                  </div>
                </li>
              </Link>

            </ul>

            <div
                className="fixed bottom-10 pl-10 flex flex-col items-center space-y-4 text-[#959190]"
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center">
                  <span className="mr-3">
                    <UserCircle size="20" />
                  </span>
                  Tutorial
                </div>
                <div className="flex items-center" onClick={handleLogoutModal}>
                  <span className="mr-3">
                    <LogOut size="20" color="#D2322D" />
                  </span>
                  logout
                </div>
              </div>
          </div>
        )}
      </aside>
      <LogoutModal open={open} setOpen={setOpen} title="Are you sure you want to logout?" />
    </>
  )
}

export default DashboardNav
