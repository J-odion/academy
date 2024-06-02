import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import { TypographyH1 } from "@/components/typography";
import { signInFormSchema } from "@/lib/formSchema";
import { NextPageWithLayout, queryClient } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormRender from "@/components/FormRender";
import React from "react";
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
import useStorage from "@/lib/useStorage";
import { useAuth } from "../../../../context/auth.context";
import Image from "next/image";

const SignIn: NextPageWithLayout = () => {
  const { toast } = useToast();
  const { getItem } = useStorage();
  const router = useRouter();

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
        toast({
          title: `Logged in successfully`,
          className: "toast-success",
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.profile] });
        const userRole = localStorage.getItem('role');
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
    onError(error) {
      toast({
        title: `Login failed`,
        description: error.message || "An unexpected error occurred",
        className: "toast-error",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0 lg:pl-8">
        <TypographyH1 className="mb-4 text-3xl lg:text-5xl">Welcome back</TypographyH1>
        <p className="mb-4 text-lg">
          Don`&apos;`t have an account?
          <Link href="/auth/signup" className="text-[#A85334]">
            Sign up
          </Link>
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 max-w-sm">
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
      </div>
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <Image src='/images/guitar_bg.png' width={500} height={400} alt="Guitar" className="rounded-lg" />
      </div>
    </div>
  );
};

export default SignIn;
