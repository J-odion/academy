import React from "react";
import Link from "next/link";


interface AssignmentsTab {
  currentTab: "received" | "pending";
}

const AssignmentsHeaderTab = ({ currentTab = "received" }: AssignmentsTab) => {

  return (
    <div className="py-4 tabs">
      <ul className="flex space-x-8 md:space-x-12">
        <Link href="/dashboard/admin/assignments">
          <li
            className={`cursor-pointer ${
              currentTab === "received" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Reviewed
          </li>
        </Link>
        <Link href="/dashboard/admin/assignments/pending">
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

export default AssignmentsHeaderTab;
