import React from "react";
import Link from "next/link";


interface SupportsTab {
  currentTab: "all" | "resolved" | "unresolved";
}

const SupportsHeaderTab = ({ currentTab = "all" }: SupportsTab) => {

  return (
    <div className="py-4 tabs">
      <ul className="flex space-x-8 md:space-x-12">
        <Link href="/dashboard/admin/support">
          <li
            className={`cursor-pointer ${
              currentTab === "all" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            All
          </li>
        </Link>
        <Link href="/dashboard/admin/support/resolved">
          <li
            className={`cursor-pointer ${
              currentTab === "resolved" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Resolved
          </li>
        </Link>
        <Link href="/dashboard/admin/support/unresolved">
          <li
            className={`cursor-pointer ${
              currentTab === "unresolved" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Unresolved
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SupportsHeaderTab;
