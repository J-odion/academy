import React, { useState, useEffect } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/admin_dashboard/DashboardSidebar";
import DashboardLayout from "@/components/layout/admin_dashboard/DashboardLayout";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Datapagination from '@/components/pagination/Data-Pagination';
import Moment from "react-moment";
import students from "@/data/students.json";
import DetailsModal from "@/components/modal/students/DetailsModal";
import AddModal from "@/components/modal/students/AddModal";
import { useGetAllStudents, useGetAllAdminSubscriptionPlans } from "../../../../../hooks/account/superAdmin";
import { useGetSubscriptionPlans } from "../../../../../hooks/subscriptions";
import { Skeleton } from "@/components/ui/skeleton";
import { NoDataCard } from "@/components/dashboard/cards/NoDataCard";

type StudentsProps = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
};

type SubscriptionPlansProps = {
  _id: number;
  name: string;
  price: number;
  peak1: string;
  peak2: string;
  peak3: string;
  subscriptionPlanId: string;
};


const itemsPerPage = 5;

const Students: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStudent, setViewStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [addModal, setAddModal] = useState(false);
  const [clientLoaded, setClientLoaded] = useState(false);
  const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});

  const { data: studentsData, isLoading } = useGetAllStudents();
  console.log(studentsData);
  const { data: subscriptionPlans, isLoading: isLoadingData } = useGetAllAdminSubscriptionPlans();
  console.log(subscriptionPlans);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentsData?.allStudents?.slice(indexOfFirstItem, indexOfLastItem);

  const colors = ["#895543", "#BA751B", "#6B2B14", "#744911", "#200D06"];

  useEffect(() => {
    if (subscriptionPlans) {
      const newColorMap: { [key: string]: string } = {};
      subscriptionPlans.forEach((plan: SubscriptionPlansProps) => {
        newColorMap[plan._id] = colors[Math.floor(Math.random() * colors.length)];
      });
      setColorMap(newColorMap);
    }
  }, [subscriptionPlans]);


  const handleViewStudent = (student: StudentsProps) => {
    setSelectedStudent(student);
    setViewStudent(true);
  }

  const handleAddModal = () => {
    setAddModal(true);
  };

  // if (!clientLoaded || isLoading) {
  //   return (
  //     <DashboardSidebar>
  //       <div className="w-full md:mt-20 mt-24">
  //         <Skeleton className="h-[400px] w-full bg-slate-300 rounded-[6px]" />
  //       </div>
  //     </DashboardSidebar>
  //   );
  // }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-20">
        <div className="py-5 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Students</h1>
            <Button className="bg-[#A85334] gap-2 sm:text-md text-lg" onClick={handleAddModal}>
              <Plus size={18} />
              Add new students
            </Button>
          </div>
          <div className="grid md:grid-cols-5 gap-4 mt-5">
            {isLoadingData && (
              <>
              <Skeleton className="h-[150px] w-full bg-slate-300 rounded-[6px]" />
              <Skeleton className="h-[150px] w-full bg-slate-300 rounded-[6px]" />
              <Skeleton className="h-[150px] w-full bg-slate-300 rounded-[6px]" />
              <Skeleton className="h-[150px] w-full bg-slate-300 rounded-[6px]" />
              <Skeleton className="h-[150px] w-full bg-slate-300 rounded-[6px]" />
              </>
            )}
            {!isLoadingData && subscriptionPlans?.map((plan: SubscriptionPlansProps) => (
              <div
                key={plan?._id}
                className="shadow-md rounded-[6px] overflow-hidden border-2 relative text-white"
                style={{ backgroundColor: colorMap[plan?._id] }}>
                <div className="p-4">
                  <p className="capitalize text-lg">{plan?.name} plan</p>
                  <p className="font-bold text-2xl mt-2">₦{plan?.price}</p>
                </div>
                <div className="absolute top-0 right-0 h-full">
                  <Image src='/images/blob.svg' alt="dashboard" width={265} height={152} className='object-cover h-full' />
                </div>
              </div>
            ))}
          </div>
        </div>
        {studentsData?.length === 0 ? (
          <NoDataCard
            img="/images/no-data.png"
            header="No students yet"
            message="You have not added any students yet. Click the button below to add a new student."
            buttonText="Add new student"
            handleClick={handleAddModal}
          />
        ) : (
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Date joined</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <Skeleton className="h-[450px] w-full bg-slate-300 rounded-[6px]" />
            )}
            {!isLoading && currentItems?.map((student: StudentsProps) => (
              <TableRow key={student?._id}>
                <TableCell>{student?.firstName} {' '}{student?.lastName}</TableCell>
                <TableCell>{student?.email}</TableCell>
                <TableCell>
                  <Moment format="YYYY/MM/DD">
                    {student?.createdAt}
                  </Moment>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"} className="border-[1px] border-[#A85334] text-[#A85334]" onClick={() => handleViewStudent(student)}>Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
        <Datapagination
          totalItems={studentsData?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <DetailsModal
        title="Student Details"
        open={viewStudent}
        setOpen={setViewStudent}
        selectedStudent={selectedStudent}
      />
      <AddModal
        title="Add new student"
        open={addModal}
        setOpen={setAddModal}
      />
    </DashboardSidebar>
  );
};

export default Students;

Students.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"students"}>{page}</DashboardLayout>;
};
