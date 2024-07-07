import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import TransactionHeaderTab from '@/components/tabs/admin_dashboard/TransactionHeaderTab';
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Moment from 'react-moment';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { transactions } from '@/data/data';
import Datapagination from '@/components/pagination/Data-Pagination';
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard';

const itemsPerPage = 5;

const Pending = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pendingTransactions = transactions.filter(transaction => transaction.status === 'pending');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingTransactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-10 mt-12 px-2">
        <TransactionHeaderTab currentTab={'pending'} />
        <div className="py-5 w-full">
          {pendingTransactions.length <= 1 ? (
            <NoDataCard
              img='/images/no-data.png'
              header='No pending transactions'
              message='You have no pending transactions'
              buttonText='View all transactions'
            />
          ) : (
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
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Moment format="YYYY/MM/DD">
                      {transaction.created_at}
                    </Moment>
                  </TableCell>
                  <TableCell>
                    <Moment format="HH:mm:ss">
                      {transaction.time_paid}
                    </Moment>
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={`${transaction.status}`} className=' placeholder:capitalize' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='recieved'>Recieved</SelectItem>
                        <SelectItem value='pending'>Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
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

export default Pending;

Pending.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"transactions"} >{page}</DashboardLayout>;
};
