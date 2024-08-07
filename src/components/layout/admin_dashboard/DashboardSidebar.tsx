import React, { useEffect, useState } from "react";
import {
  PieChart,
  ChevronRight,
  LogOut,
  BookOpen,
  BookText,
  ShoppingBag,
  MessageCircle,
  Users,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStorage } from "@/lib/useStorage";

// ill use this for the avatar

type DashboardSidebarProps = React.PropsWithChildren & {
  className?: string;
};

const DashboardSidebar = ({ children }: DashboardSidebarProps) => {
  const router = useRouter();
  const { route } = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = useStorage.getItem("firstName");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      <aside className="relative">
        <div className="fixed hidden h-screen w-72 bg-white lg:flex border-r">
          <div>
            <div className="flex items-center gap-3 justify-center h-20">
              <Link href='/dashboard/admin/account/profile'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <h1 className="text-2xl font-bold">
                {user ? user : "Admin"}
              </h1>
            </div>
            <ul className="flex flex-col py-2 px-4">
              <Link href="/dashboard/admin/account">
                <li
                  className={
                    route === "/dashboard/admin/account"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <PieChart size="20" />
                    </span>
                   <p> Dashboard</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/courses">
                <li
                  className={
                    route === "/dashboard/admin/courses"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookOpen size="20" />
                    </span>
                    <p>Courses</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/subscription-plans">
                <li
                  className={
                    route === "/dashboard/admin/subscription-plans"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookText size="20" />
                    </span>
                    <p>Subscription Plans</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/transactions">
                <li
                  className={
                    route === "/dashboard/admin/transactions"
                      ? "bg-[#1C1C1C0D] p2-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookText size="20" />
                    </span>
                    <p>Transactions</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/tutors">
                <li
                  className={
                    route === "/dashboard/admin/tutors"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <ShoppingBag size="20" />
                    </span>
                    <p>Tutors</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/students">
                <li
                  className={
                    route === "/dashboard/admin/students"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <Users size="20" />
                    </span>
                    <p>Students</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/assignments">
                <li
                  className={
                    route === "/dashboard/admin/assignments"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <MessageCircle size="20" />
                    </span>
                    <p>Assignments</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/chat-forum">
                <li
                  className={
                    route === "/dashboard/admin/chat-forum"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <MessageCircle size="20" />
                    </span>
                    <p>Chat Forum</p>
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/admin/support">
                <li
                  className={
                    route === "/dashboard/admin/support"
                      ? "bg-[#1C1C1C0D] py-2 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-2 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <UserCircle size="20" />
                    </span>
                    <p>Support</p>
                  </div>
                </li>
              </Link>
            </ul>
            <div
              className="fixed bottom-10 pl-10 text-[#959190]"
              style={{ cursor: "pointer" }}
            >
              <div
                className="flex items-center text-[#D06B0D]"
                onClick={handleLogout}
              >
                <span className="mr-3">
                  <LogOut size="20" color="#D06B0D" />
                </span>
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full min-h-screen w-full pl-5 pr-5 pt-12 py-10 md:pt-10 lg:min-h-40 lg:pl-[19rem] lg:pr-2 pb-20">
          {children}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
