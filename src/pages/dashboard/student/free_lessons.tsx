import React, {useState} from 'react'
import DashboardLayout from "@/components/layout/students_dashboard/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/students_dashboard/DashboardSidebar";
import Datapagination from '@/components/pagination/Data-Pagination';
import { free_lessons } from '@/data/data';

const itemsPerPage = 12;

const FreeLessons: NextPageWithLayout = () => {
    const [currentPage, setCurrentPage] = useState(1);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = free_lessons.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DashboardSidebar>
        <div className="w-full mt-20 md:mt-20">
            <h1 className='text-[#1E1E1E] text-2xl font-lg'>Free Lessons</h1>
            <div className="py-8 grid md:grid-cols-4 gap-8">
                {currentItems.map((lesson) => (
                    <div
                        key={lesson.id}
                        className=" flex flex-col space-y-4"
                    >
                        <video className='rounded-md w-full' controls>
                            <source src={lesson.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h3 className="text-normal font-md text-[#1E1E1E]">{lesson.title}</h3>
                        <p className='text-[#1E1E1E80] text-sm'>{lesson.time}</p>
                    </div>
                ))}
            </div>
        </div>

        <Datapagination
          totalItems={free_lessons.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
    </DashboardSidebar>
  )
}

export default FreeLessons

FreeLessons.getLayout = function getLayout(page: React.ReactElement) {
    return <DashboardLayout page={"dashboard"}>{page}</DashboardLayout>;
};
