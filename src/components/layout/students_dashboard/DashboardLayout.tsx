import { useState } from 'react'
import DashboardNav from './DashboardNav';
import { BookOpen, BookText, MessageCircle, PieChart, ShoppingBag, UserCircle, Users } from 'lucide-react';


type DashboardPages =
  |'dashboard'
  |'courses'
  |'shoppers'
  |'curriculum'
  |'chat-forum'
  |'transactions'
  |'subscription-plans'
  |'support';

  type DashboardIcons  = {
    dashboard: JSX.Element;
    courses: JSX.Element;
    shoppers: JSX.Element;
    curriculum: JSX.Element;
    'chat-forum': JSX.Element;
    transactions: JSX.Element;
    'subscription-plans': JSX.Element;
    support: JSX.Element;
  };

  export const icons: DashboardIcons = {
    dashboard: <PieChart size="20"/>,
    courses: <BookOpen size="20" />,
    shoppers: <Users size="20" />,
    curriculum: <ShoppingBag size="20" />,
    'subscription-plans': <BookText size="20" />,
    transactions: <BookText size="20" />,
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
