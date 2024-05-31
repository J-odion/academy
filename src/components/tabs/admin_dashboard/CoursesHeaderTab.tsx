import React from 'react'
import Link from 'next/link';

interface CategoryCoursesProps {
    currentTab: "category-courses" | "free-courses" | "shopper-courses";
}

const CoursesHeaderTab = ({currentTab = "category-courses"}: CategoryCoursesProps) => {


  return (
    <div className="py-4 tabs">
      <ul className="flex space-x-8 md:space-x-12">
        <Link href="/dashboard/admin/courses">
          <li
            className={`cursor-pointer ${
              currentTab === "category-courses" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Category Courses
          </li>
        </Link>

        <Link href="/dashboard/admin/courses/free-courses">
          <li
            className={`cursor-pointer ${
              currentTab === "free-courses" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Free Courses
          </li>
        </Link>

        <Link href="/dashboard/admin/courses/shopper-courses">
          <li
            className={`cursor-pointer ${
              currentTab === "shopper-courses" && "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Shopper Courses
          </li>
        </Link>
      </ul>
      <hr className="border-slate-500" />
    </div>
  )
}

export default CoursesHeaderTab
