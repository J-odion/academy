import React, {useState} from "react";
import DashboardSidebar from "@/components/layout/students_dashboard/DashboardSidebar";
import DashboardLayout from "@/components/layout/students_dashboard/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { student_courses } from "@/data/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Datapagination from "@/components/pagination/Data-Pagination";

const itemsPerPage = 12;

const BuyCourses: NextPageWithLayout = () => {

    const [currentPage, setCurrentPage] = useState(1);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = student_courses.slice(indexOfFirstItem, indexOfLastItem);

    const formatToNigerianCurrency = (price: number) => {
        const formatter = new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
        });
        return formatter.format(price);
      };


  return (
    <DashboardSidebar>
      <div className="w-full mt-20 md:mt-20">
        <div>
          <h2>Courses</h2>
          <p>
            Take your learning journey to the next level and discover our single
            courses.
          </p>
        </div>
        <div className="py-8 grid md:grid-cols-4 gap-4">
          {currentItems.map((course) => (
            <div
              key={course.id}
              className="bg-[#FEF9F8] border-[0.5px] border-[#C4AAA1] p-4 relative flex flex-col space-y-4"
            >
              <h3 className="text-normal font-md text-[#1E1E1E]">{course.title}</h3>
              <p
                style={{
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {course.content}
              </p>

              <div className="absolute right-0 top-0">
                <Image
                  src="/images/courses_bg.svg"
                  alt="blob"
                  width={200}
                  height={156}
                  className="object-cover rounded-[10px]"
                />
              </div>
              <p className="text-[#D06B0D]">{formatToNigerianCurrency(course.price)}</p>
              <Button variant={"outline"} className="w-full border-[1px] border-[#A85334] text-[#A85334] cursor-pointer">
                Buy
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Datapagination
          totalItems={student_courses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
    </DashboardSidebar>
  );
};

export default BuyCourses;

BuyCourses.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"dashboard"}>{page}</DashboardLayout>;
};
