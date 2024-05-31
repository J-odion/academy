import React from 'react'
import Link from 'next/link';

interface CurriculumProps {
    currentTab: "beginner" | "amateur" | "intermediate" | "advanced";
}

const CurriculumHeaderTab = ({currentTab='beginner'}: CurriculumProps) => {
  return (
    <div className="py-4 tabs">
      <ul className="flex space-x-8 md:space-x-12">
      <Link href="/dashboard/student/curriculum">
          <li
            className={`cursor-pointer ${
              currentTab === "beginner" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Beginner
          </li>
        </Link>
        <Link href="/dashboard/student/curriculum/amateur">
          <li
            className={`cursor-pointer ${
              currentTab === "amateur" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Amateur
          </li>
        </Link><Link href="/dashboard/student/curriculum/intermediate">
          <li
            className={`cursor-pointer ${
              currentTab === "intermediate" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Intermediate
          </li>
        </Link>
        <Link href="/dashboard/student/curriculum/advanced">
          <li
            className={`cursor-pointer ${
              currentTab === "advanced" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Advanced
          </li>
        </Link>
      </ul>
      <hr className="border-[#F0EAE8] border-b-[1px]" />
    </div>
  )
}

export default CurriculumHeaderTab
