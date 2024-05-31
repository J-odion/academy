import React, { useState } from "react";
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

const plans = [
  {
    id: 1,
    name: "1 Month",
    price: 670,
    color: "#895543",
  },
  {
    id: 2,
    name: "3 Month",
    price: 670,
    color: "#BA751B",
  },
  {
    id: 3,
    name: "6 Month",
    price: 670,
    color: "#6B2B14"
  },
  {
    id: 4,
    name: "12 Month",
    price: 670,
    color: "#744911",
  },
  {
    id: 5,
    name: "Without plan",
    price: 670,
    color: "#200D06"
  }
];

const itemsPerPage = 5;

const Students: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStudent, setViewStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [addModal, setAddModal] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setViewStudent(true);
  }

  const handleAddModal = () => {
    setAddModal(true);
  };

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div className="py-5 w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium">Students</h1>
            <Button className="bg-[#A85334] gap-2" onClick={handleAddModal}>
              <Plus size={18} />
              Add new students
            </Button>
          </div>
          <div className="grid md:grid-cols-5 gap-4 mt-5">
            {plans.map((plan) => (
              <div key={plan.id} className="shadow-md rounded-[6px] overflow-hidden border-2 relative text-white" style={{ backgroundColor: plan.color }}>
                <div className="p-4">
                  <p className="capitalize text-lg">{plan.name} plan</p>
                  <p className="font-bold text-2xl mt-2">₦{plan.price}</p>
                </div>
                <div className="absolute top-0 right-0 h-full">
                  <Image src='/images/blob.svg' alt="dashboard" width={265} height={152} className='object-cover h-full' />
                </div>
              </div>
            ))}
          </div>
        </div>
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
            {currentItems.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Moment format="YYYY/MM/DD">
                    {student.date_joined}
                  </Moment>
                </TableCell>
                <TableCell>
                  <Button variant={"outline"} className="border-[1px] border-[#A85334] text-[#A85334]" onClick={() => handleViewStudent(student)}>Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Datapagination
          totalItems={students.length}
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
