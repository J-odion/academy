import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import { TypographyH1, TypographyH3 } from "@/components/typography";
import { signInFormSchema } from "@/lib/formSchema";
import { NextPageWithLayout, queryClient } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormRender from "@/components/FormRender";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import { LoginProps } from "../../../../hooks/auth/types";
import { useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../../../../hooks/auth";
import { QUERY_KEYS } from "@/lib/utils";
import { useStorage } from "@/lib/useStorage";
import { AuthContext, useAuth } from "../../../../context/auth.context";
import Image from "next/image";
import { motion } from "framer-motion";

const SignIn: NextPageWithLayout = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setAuthTokens } = useContext(AuthContext);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.login],
    mutationFn: (data: LoginProps) => AuthLogin(data),
    onSuccess(res) {
      if (res.status === 200) {
        console.log("Login response:", res.data);
        toast({
          title: `Logged in successfully`,
          className: "toast-success",
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.profile] });
        setAuthTokens(res.data.accessToken, res.data.refreshToken);
        useStorage.setItem("studentFirstName", res?.data?.Student?.firstName)
        useStorage.setItem("studentLastName", res?.data?.Student?.lastName)
        useStorage.setItem("studentEmail", res?.data?.Student.email)
        // localStorage.setItem("accessToken", res.data.accessToken);
        // localStorage.setItem("refreshToken", res.data.refreshToken);
        const userRole = localStorage.getItem("role");
        if (res.data.role === "admin") {
          router.push(`/dashboard/admin/account`);
        } else {
          router.push(`/dashboard/student/account`);
        }
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
    },
    // onError(error) {
    //   toast({
    //     title: `Login failed`,
    //     description: error.message || "An unexpected error occurred",
    //     className: "toast-error",
    //   });
    // },
  });

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
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
        </div>
        <TypographyH1 className="mb-4 w-full text-center lg:text-left">
          Welcome back
        </TypographyH1>

        <p className="mb-4 hidden lg:flex w-full text-center lg:text-left">
          Continue from where you left off. There are a lot to learn today!
        </p>
        {/* <TypographyH1 className="mb-4 text-3xl lg:text-5xl">Welcome back</TypographyH1>
        <p className="mb-4 text-lg">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#A85334]">
            Sign up
          </Link>
        </p> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 max-w-sm"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormRender
                  placeholder="Enter email"
                  field={field}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormRender
                  placeholder="Enter password"
                  field={field}
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />

            <CustomButton
              type="submit"
              className="bg-[#A85334] w-full p-3 rounded text-white"
              disabled={isPending}
              isLoading={isPending}
            >
              Log in
            </CustomButton>
          </form>
        </Form>
        <div className="mt-4 flex gap-2 justify-center lg:justify-between">
          <p className="">Don&apos;t have an account?</p>
          <Link href="/auth/signup" className="text-[#A85334] hover:underline">
            Sign up
          </Link>
          <Link
            href="/auth/forgot-password"
            className="underline text-blue-600"
          >
            Forgot password
          </Link>
        </div>
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

export default SignIn;
