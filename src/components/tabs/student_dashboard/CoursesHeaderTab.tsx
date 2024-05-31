import React from 'react'
import Link from "next/link";


interface CoursesHeaderTab {
    currentTab: "all" | "courses" | "lessons";
  }

const CoursesHeaderTab = ({currentTab= "all"}: CoursesHeaderTab) => {
  return (
    <div className="py-4 tabs">
        <ul className="flex space-x-8 md:space-x-12">
        <Link href="/dashboard/student/courses">
          <li
            className={`cursor-pointer ${
              currentTab === "all" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            All
          </li>
        </Link>
        <Link href="/dashboard/student/course">
          <li
            className={`cursor-pointer ${
              currentTab === "courses" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Courses
          </li>
        </Link>
        <Link href="/dashboard/student/lessons">
          <li
            className={`cursor-pointer ${
              currentTab === "lessons" &&
              "border-b-2 border-[#A85334] text-[#A85334] bg-[#FDF4E9] py-2 px-4"
            }`}
          >
            Lessons
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default CoursesHeaderTab
