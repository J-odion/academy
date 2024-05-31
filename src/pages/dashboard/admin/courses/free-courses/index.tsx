import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import CoursesHeaderTab from '@/components/tabs/admin_dashboard/CoursesHeaderTab';
import freecourses from '@/data/freeCourses.json';
import { EllipsisVertical, Plus } from 'lucide-react';
import EditModal from '@/components/modal/courses/free-courses/EditModal';
import AddModal from '@/components/modal/courses/free-courses/AddModal';
import DeleteModal from '@/components/modal/courses/DeleteModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import Datapagination from '@/components/pagination/Data-Pagination';

const itemsPerPage = 8;

const FreeCourses: NextPageWithLayout = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMenuClick = (courseId: string) => {
    setMenuOpen(courseId === menuOpen ? null : courseId);
  };

  const [editModal, setEditModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleEditModal = () => setEditModal(!editModal);
  const handleAddModal = () => setAddModal(!addModal);
  const handleDeleteModal = () => setDeleteModal(!deleteModal);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = freecourses.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div className="flex justify-end items-center md:flex-row gap-4 mb-4">
          <div className="md:flex md:items-center gap-2">
            <Checkbox /> <span className="">Select</span>
          </div>
          <Button className='bg-[#A85334]' onClick={handleAddModal}><Plus size={18} />Add Course</Button>
        </div>
        <CoursesHeaderTab currentTab={'free-courses'} />
        <div className='grid md:grid-cols-4 grid-cols-1 gap-8'>
          {currentItems.map((course) => (
            <div key={course.id} className='flex flex-col gap-2 rounded-[6px] justify-between py-4 relative'>
              <div className='flex items-center gap-4'>
                <video className='rounded-md w-full' controls>
                  <source src={course.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className='flex justify-between'>
                <h5>{course.title}</h5>
                <div className="relative">
                  <EllipsisVertical size={18} className='text-[#E89222] cursor-pointer' onClick={() => handleMenuClick(course.id.toString())} />
                  {menuOpen === course.id.toString() && (
                    <div className="absolute right-0 top-full bg-white border border-gray-200 shadow-md rounded-md mt-2 py-1 w-32">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleEditModal}>Edit</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleDeleteModal}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex justify-between text-[#1E1E1E80] text-[14px]'>
                <h5>{course.name_of_tutor}</h5>
                <p>{course.video_duration}</p>
              </div>
            </div>
          ))}
        </div>
        <Datapagination
          totalItems={freecourses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <EditModal
        title='Edit Course'
        open={editModal}
        setOpen={setEditModal}
       />
       <AddModal
       title='Add course'
       open={addModal}
       setOpen={setAddModal}
      />
      <DeleteModal
       title='Delete course'
       message='This action can not be reversed'
       open={deleteModal}
       setOpen={setDeleteModal}
      />
    </DashboardSidebar>
  );
};

export default FreeCourses;

FreeCourses.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"courses"} >{page}</DashboardLayout>;
};
