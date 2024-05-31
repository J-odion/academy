import React, {useState} from "react";
import DashboardSidebar from "@/components/layout/students_dashboard/DashboardSidebar";
import DashboardLayout from "@/components/layout/students_dashboard/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CurriculumHeaderTab from "@/components/tabs/student_dashboard/CurriculumHeaderTab";
import categories from '@/data/categories.json';
import Image from "next/image";
import Datapagination from "@/components/pagination/Data-Pagination";
import CourseDetailsModal from "@/components/modal/student_dashboard/CourseDetailsModal";

const itemsPerPage = 12;

const Advanced: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCourse, setViewCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
    setViewCourse(true);
  }

  const formatToNigerianCurrency = (price: number) => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    return formatter.format(price);
  };

  const displayAdvanced = categories.filter((category) => category.category === 'advanced');
  const currentItems = displayAdvanced.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DashboardSidebar>
      <div className="w-full mt-20 md:mt-20">
        <div className="flex justify-between">
          <h1 className="text-[#1E1E1E] font-medium text-2xl">Check out our curriculum</h1>
          <Button className="inline-flex items-center gap-[1px] bg-[#A85334]"><span><Plus size={18} /></span>Subscribe to a plan</Button>
        </div>
        <CurriculumHeaderTab currentTab="advanced" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {currentItems.map((category) => (
            <div key={category.id} className='flex flex-col gap-2 px-4 rounded-[6px] justify-between py-4 border-[1px] border-[##E9D3CC] bg-[#FEF9F8]'>
              <div className='flex items-center gap-4'>
                <video className='rounded-md w-full' controls>
                  <source src={category.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h5>{category.title}</h5>
              <p>{category.no_of_lessons}{" "}lessons</p>
              <div className="flex justify-between items-center gap-6 mt-6">
                <p className="text-[#A85334] font-bold text-xl">{formatToNigerianCurrency(category.price)}</p>
                <Button className='bg-[#A85334] rounded-[5px] w-[97px]' onClick={() => handleViewCourse(category)}>Buy</Button>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <Datapagination
        totalItems={displayAdvanced.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <CourseDetailsModal
        title="Course Details"
        open={viewCourse}
        setOpen={setViewCourse}
        selectedCourse={selectedCourse}
       />
    </DashboardSidebar>
  );
};

export default Advanced;

Advanced.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"curriculum"}>{page}</DashboardLayout>;
};
