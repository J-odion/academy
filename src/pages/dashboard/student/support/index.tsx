import React, { useState } from "react";
import DashboardSidebar from "@/components/layout/students_dashboard/DashboardSidebar";
import DashboardLayout from "@/components/layout/students_dashboard/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/data";
import Datapagination from "@/components/pagination/Data-Pagination";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/CustomButton";

const itemsPerPage = 11;

const Support: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faq.slice(indexOfFirstItem, indexOfLastItem);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted with values:", values);
      reset();
    }, 1000);
  };

  return (
    <DashboardSidebar>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-1/2 mt-14 lg:mt-20 flex flex-col space-y-3">
          <h1 className="text-[#1E1E1E] text-3xl font-md">Support</h1>
          <p>Commonly asked questions</p>
          <Accordion type="single" collapsible>
            {currentItems.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id.toString()}>
                <AccordionTrigger className="text-[#1E1E1E] text-sm font-normal">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#976B5B]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="w-full lg:w-1/2 bg-[#F4C991] py-6 px-8 mt-8 lg:mt-8">
          <p className="pb-4 text-[#1E1E1E] text-lg font-medium w-[20ch]">
            Can&apos;t find your answers? Report your complaints
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-8"
          >
            <Input
              {...register("email")}
              placeholder="Your email address"
              className="bg-white border-[1px] border-[#C4AAA1]"
            />
            <Textarea
              {...register("response")}
              placeholder="Type your complaints here"
              className="bg-white border-[1px] border-[#C4AAA1] h-[405px]"
            ></Textarea>
            <div className="flex justify-between gap-4">
              <CustomButton
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full bg-[#A85334] hover:bg-[#A85334]/50"
              >
                Submit
              </CustomButton>
            </div>
          </form>
        </div>
      </div>

      <Datapagination
        totalItems={faq.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </DashboardSidebar>
  );
};

export default Support;

Support.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"support"}>{page}</DashboardLayout>;
};
