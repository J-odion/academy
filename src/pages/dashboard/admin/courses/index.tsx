import { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import CoursesHeaderTab from '@/components/tabs/admin_dashboard/CoursesHeaderTab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Trash, Pencil } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import categories from '@/data/categories.json';
import { Plus } from 'lucide-react';
import DeleteModal from '@/components/modal/courses/category-courses/DeleteModal';
import EditModal from '@/components/modal/courses/EditModal';
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddModal from '@/components/modal/courses/category-courses/AddModal';
import { useDeleteCategory, useGetFreeCourses, useAddCategory } from '../../../../../hooks/account/admin';

type EnrolledStudents = {
  id: number;
  name: string;
  email: string;
};

type FreeCoursesProps = {
  _id: number;
  courseTitle: string;
  courseOrder: number;
  videoLink: string;
  description: string;
  assignmentQuestion1: string;
  assignmentQuestion2: string;
  assignmentQuestion3: string;
  adminId: number;
  enrolledStudents: EnrolledStudents[];
  freeCourseId: number;
};


const Courses: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FreeCoursesProps | null>(null);
  const [addCatergoryModal, setAddCategoryModal] = useState<boolean>(false);

  const { data: freecourses, isLoading } = useGetFreeCourses();
  const { mutate: deleteCategory, isPending } = useDeleteCategory(selectedCategory?.freeCourseId);
  const {mutate: addCategory, isPending: pendingCategory} = useAddCategory();

  const handleDeleteModal = () => {
    setSelectedCategory(selectedCategory);
    setDeleteModal(!deleteModal);
  }

  const handleEditModal = () => {
    setEditModal(!editModal);
  }

  // const handleAddModal = () => {
  //   setAddModal(!addModal);
  // }

  const handleAddCategoryModal = () => {
    setAddCategoryModal(!addCatergoryModal);
  }

  const handleViewCategory = (category: string) => {
    router.push(`/dashboard/admin/courses/category-courses/${category}`);
  }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <CoursesHeaderTab currentTab={'category-courses'} />

        <div className="py-5 w-full overflow-x-auto">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Enrolled students</TableHead>
              </TableRow>
            </TableHeader>
            {categories.length === 0 ? (
              <NoDataCard
                img='/images/no-data.png'
                header='No categories found'
                message='Create a category to add courses'
                buttonText='Add category'
                handleClick={handleAddCategoryModal}
              />
            ) : (
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className='inline-flex items-center gap-4'>{category.category} <span className='cursor-pointer text-[#A85334]'><Pencil size={18} onClick={handleEditModal} /></span></TableCell>
                  <TableCell>{category.no_of_courses}</TableCell>
                  <TableCell>{category.enrolled_students}</TableCell>
                  <TableCell>
                    <Button variant={'outline'} className='border-[#A85334] border-[1px] text-[#A85334]' onClick={() => handleViewCategory(category.category.toLowerCase())}>View</Button>
                  </TableCell>
                  <TableCell onClick={handleDeleteModal}><Trash size={20} color='#A85334' className='cursor-pointer' /></TableCell>
                </TableRow>
              ))}
            </TableBody>
            )}
          </Table>
        </div>

        <div className='py-4 flex flex-col gap-4 sm:flex-row lg:flex-row'>
          <Button variant={'outline'} className='border-[1px] border-[#A85334] text-[#A85334] sm:ml-0 lg:ml-0' onClick={handleAddCategoryModal}><span><Plus size={18} /></span>{" "}Add category</Button>
          <Button className='bg-[#A85334]'><span><Plus size={18} /></span>{" "}Add course</Button>
        </div>
      </div>

      {selectedCategory && (
      <DeleteModal
        title='Are you sure you want to delete this category'
        message='This will delete all courses under this categories'
        open={deleteModal}
        setOpen={setDeleteModal}
        deleteCategory={deleteCategory}
        freeCourse={selectedCategory}
        isPending={isPending}
      />
      )}

      <EditModal
        title='Edit category name'
        open={editModal}
        setOpen={setEditModal}
      />

      <AddModal
        title='Add category'
        open={addModal}
        setOpen={setAddModal}
        addCategory={addCategory}
        isPending={pendingCategory}
      />
    </DashboardSidebar>
  )
}

export default Courses;

Courses.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"courses"} >{page}</DashboardLayout>;
};
