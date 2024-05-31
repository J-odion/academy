import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/students_dashboard/DashboardLayout';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/students_dashboard/DashboardSidebar';
import TransactionHeaderTab from '@/components/tabs/student_dashboard/TransactionHeaderTab';
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Moment from 'react-moment';
import transactions from '@/data/students_dashboard/transactions.json';
import Datapagination from '@/components/pagination/Data-Pagination';

const itemsPerPage = 5;

const Transactions: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const getBackgroundColor = (status: string) => {
    const successfulColor = 'bg-[#C6E8B3] text-[#5E8D44]';
    const pendingColor = 'bg-[#F2CDCD] text-[#BF0E0E]';
    return status === 'successful' ? successfulColor : pendingColor;
  };

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-10 mt-12 px-2">
        <TransactionHeaderTab currentTab={'all'} />
        <div className="py-5 w-full">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Transaction References</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Plan/Course</TableHead>
                <TableHead>Amount paid</TableHead>
                <TableHead>Date paid</TableHead>
                <TableHead>Time paid</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.transactionRef}</TableCell>
                  <TableCell>{transaction.email}</TableCell>
                  <TableCell>{transaction.plan}</TableCell>
                  <TableCell>{transaction.amount_paid}</TableCell>
                  <TableCell>
                    <Moment format="YYYY/MM/DD">
                      {transaction.date_paid}
                    </Moment>
                  </TableCell>
                  <TableCell>
                    <Moment format="HH:mm:ss">
                      {transaction.time_paid}
                    </Moment>
                  </TableCell>
                  <TableCell>
                  <div className={`rounded-[6px] capitalize text-center flex justify-center items-center px-4 w-fit h-[2.5em] ${getBackgroundColor(transaction.status)}`}>
                      {transaction.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Datapagination
            totalItems={transactions.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </DashboardSidebar>
  );
}

export default Transactions;

Transactions.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"transactions"} >{page}</DashboardLayout>;
};
