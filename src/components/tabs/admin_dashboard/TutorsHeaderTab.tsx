import React from "react";
import Link from "next/link";


interface TutorsProps {
  currentTab: "accepted" | "pending" ;
}

const TutorsHeaderTab = ({ currentTab = "accepted" }: TutorsProps) => {

  return (
    <div className="py-4 tabs">
      <ul className="flex space-x-8 md:space-x-12">
        <Link href="/dashboard/admin/tutors">
          <li
            className={`cursor-pointer ${
              currentTab === "accepted" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Accepted
          </li>
        </Link>
        <Link href="/dashboard/admin/tutors/pending">
          <li
            className={`cursor-pointer ${
              currentTab === "pending" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Pending
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default TutorsHeaderTab;
