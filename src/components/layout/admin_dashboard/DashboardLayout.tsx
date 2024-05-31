import { useState } from 'react'
import DashboardNav from './DashboardNav';
import { BookOpen, BookText, MessageCircle, PieChart, ShoppingBag, UserCircle, Users } from 'lucide-react';


type DashboardPages =
  |'dashboard'
  |'courses'
  |'subscription-plans'
  |'transactions'
  |'tutors'
  |'students'
  |'assignments'
  |'chat-forum'
  |'support';

  type DashboardIcons  = {
    dashboard: JSX.Element;
    courses: JSX.Element;
    'subscription-plans': JSX.Element;
    transactions: JSX.Element;
    tutors: JSX.Element;
    students: JSX.Element;
    assignments: JSX.Element;
    'chat-forum': JSX.Element;
    support: JSX.Element;
  };

  export const icons: DashboardIcons = {
    dashboard: <PieChart size="20"/>,
    courses: <BookOpen size="20" />,
    'subscription-plans': <BookText size="20" />,
    transactions: <BookText size="20" />,
    tutors: <ShoppingBag size="20" />,
    students: <Users size="20" />,
    assignments: <MessageCircle size="20" />,
    'chat-forum': <MessageCircle size="20" />,
    support: <UserCircle size="20" />,
  }


type DashboardLayoutProps = React.PropsWithChildren & {
  page: DashboardPages;
  children?: React.ReactNode;
};

const DashboardLayout = ({ children, page, }: DashboardLayoutProps) => {

  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <>
      <div className="relative">
        <DashboardNav
          page={page}
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
         />
          {children}
      </div>
    </>
  )
}

export default DashboardLayout
