import React, {useState} from "react";
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
import LogoutModal from "@/components/modal/student_dashboard/LogoutModal";

// ill use this for the avatar

type DashboardSidebarProps = React.PropsWithChildren & {
  className?: string;
};

const DashboardSidebar = ({ children }: DashboardSidebarProps) => {
  const [open, setOpen] = useState(false);

  // const router = useRouter();
  const { route } = useRouter();

  // const handleLogout = () => {
  //   router.push("/auth/login");
  // };

  const handleLogoutModal = () => {
    setOpen(!open);
}

  return (
    <>
      <aside className="relative">
        <div className="fixed hidden h-screen w-72 bg-white lg:flex border-r">

          <div>
            <div className="flex items-center gap-3 justify-center h-20">
            <Link href='/dashboard/student/account/profile'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <h1 className="text-2xl font-bold">Student</h1>
            </div>
            {/* <nav className="flex-grow"> */}
            <ul className="flex flex-col py-4 px-4">
              <Link href="/dashboard/student/account">
                <li
                  className={
                    route === "/dashboard/student/account"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <PieChart size="20" />
                    </span>
                    Dashboard
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/courses">
                <li
                  className={
                    route === "/dashboard/student/courses"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookOpen size="20" />
                    </span>
                    My Course(s)
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/shoppers">
              <li
                  className={
                    route === "/dashboard/student/shoppers"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookOpen size="20" />
                    </span>
                    Shoppers
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/curriculum">
                <li
                    className={
                        route === "/dashboard/student/curriculum"
                        ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                        : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                    }
                    >
                    <div className="flex items-center">
                        <span className="mr-3">
                        <BookOpen size="20" />
                        </span>
                        Curriculum
                    </div>
                    </li>
              </Link>

              <Link href="/dashboard/student/chat-forum">
                <li
                  className={
                    route === "/dashboard/student/chat-forum"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <MessageCircle size="20" />
                    </span>
                    Chat Forum
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/transactions">
                <li
                  className={
                    route === "/dashboard/student/transactions"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookText size="20" />
                    </span>
                    Transactions
                  </div>
                </li>
              </Link>

              <Link href="/dashboard/student/subscription-plans">
                <li
                  className={
                    route === "/dashboard/student/subscription-plans"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <BookText size="20" />
                    </span>
                    Subscription Plans
                  </div>
                </li>
              </Link>


              <Link href="/dashboard/student/support">
                <li
                  className={
                    route === "/dashboard/student/support"
                      ? "bg-[#1C1C1C0D] py-3 pl-10 text-[#1C1C1C] rounded-xl"
                      : "my-1 py-3 pl-10 hover:bg-[#1C1C1C0D] hover:text-[#1C1C1C] rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <UserCircle size="20" />
                    </span>
                    Support
                  </div>
                </li>
              </Link>
            </ul>
            {/* </nav> */}
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
              <div
                className="flex items-center text-[#D06B0D]"
                onClick={handleLogoutModal}
              >
                <span className="mr-3">
                  <LogOut size="20" color="#D06B0D" />
                </span>
                Logout
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-full min-h-screen w-full pl-5 pr-5 pt-12 py-10 md:pt-12 lg:min-h-40 lg:pl-[32rem] lg:pr-10">
                {children}
            </div> */}
        <div className="h-full min-h-screen w-full pl-5 pr-5 pt-12 py-10 md:pt-10 lg:min-h-40 lg:pl-[19rem] lg:pr-2 pb-20">
          {children}
        </div>
      </aside>

      <LogoutModal open={open} setOpen={setOpen} title="Are you sure you want to logout?" />
    </>
  );
};

export default DashboardSidebar;
