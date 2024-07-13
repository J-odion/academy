import React from "react";
import { AuthChangePassword } from "../../../../hooks/auth";
import { NextPageWithLayout, queryClient } from "@/pages/_app";
import Image from "next/image";
import { TypographyH1 } from "@/components/typography";
import Link from "next/link";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormRender from "@/components/FormRender";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/utils";
import CustomButton from "@/components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import { motion } from "framer-motion";


type ChangePasswordProps = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ForgotPassword: NextPageWithLayout = () => {
    const { toast } = useToast();

    const {mutate, isPending} = useMutation({
        mutationKey: [QUERY_KEYS.changePassword],
        mutationFn: (data: ChangePasswordProps) => AuthChangePassword(data),
        onSuccess(res) {
            if (res.status === 200) {
                console.log("Change password response:", res.data);
                toast({
                    title: `Password changed successfully`,
                    className: "toast-success",
                });
            } else if (res.status === 404) {
                toast({
                    title: `User not found`,
                    description: res.data.message || "User not found",
                    className: "toast-error",
                });
            } else {
                toast({
                    title: `Something went wrong!`,
                    description: res.data.message || "Unable to login",
                    className: "toast-error",
                });
            }
        }
    });

    const form = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: any) => {
        mutate(values);
    };

    const containerVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          when: "beforeChildren",
          staggerChildren: 0.3,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const floatingVariants = {
      float: {
        y: [0, 10, 0],
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    };

    const rotatingVariants = {
      rotate: {
        rotate: [0, 360],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      },
    };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0 lg:pl-8">
        <div className="flex justify-center flex-col mb-10">
          <Link href="/" className="text-[#A85334]">
            <Image
              className="h-[100px] w-[100px] mx-auto lg:mx-0 mb-4 "
              src="/SGALOGO.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </Link>
          <TypographyH1 className="mb-4 w-full text-center lg:text-left">
            Forgot Password
          </TypographyH1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 max-w-sm"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormRender
                  placeholder="Enter new password"
                  field={field}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormRender
                  placeholder="Confirm new password"
                  field={field}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />
            <CustomButton
              type="submit"
              className="w-full bg-[#A85334] text-white p-3 rounded"
                disabled={isPending}
                isLoading={isPending}
            >
              Reset Password
            </CustomButton>
          </form>
        </Form>
      </div>
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <Image
          src="/images/guitar_bg.png"
          width={400}
          height={400}
          alt="Guitar"
          className="rounded-lg"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-brown rounded-full filter blur-2xl opacity-20"
        variants={floatingVariants}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-yellow-300 rounded-full filter blur-2xl opacity-20"
        variants={floatingVariants}
      ></motion.div>
    </div>
  );
};

export default ForgotPassword;
