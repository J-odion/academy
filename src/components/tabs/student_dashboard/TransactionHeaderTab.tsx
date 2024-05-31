import React from "react";
import Link from "next/link";


interface TransactionsProps {
  currentTab: "all" | "successful" | "pending";
}

const TransactionHeaderTab = ({ currentTab = "all" }: TransactionsProps) => {

  return (
    <div className="py-4 tabs">
      <ul className="flex space-x-8 md:space-x-12">
        <Link href="/dashboard/student/transactions">
          <li
            className={`cursor-pointer ${
              currentTab === "all" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            All
          </li>
        </Link>
        <Link href="/dashboard/student/transactions/successful">
          <li
            className={`cursor-pointer ${
              currentTab === "successful" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Successful
          </li>
        </Link>
        <Link href="/dashboard/student/transactions/pending">
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

export default TransactionHeaderTab;
