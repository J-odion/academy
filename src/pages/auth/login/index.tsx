import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/typography";
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
    <AuthSection className="h-[100vh]">
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

        <Link href="/">
          <TypographyH1 className="mb-4 w-full text-center lg:text-left">
            Spicy Guitar Academy
          </TypographyH1>
        </Link>
      </div>
      <TypographyH1 className="mb-4 w-full text-center lg:text-left">
        Welcome back
      </TypographyH1>

      <TypographyH3 className="mb-4 w-full text-center lg:text-left">
        Continue from where you left off. There are a lot to learn today!
      </TypographyH3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormRender placeholder="Enter email" field={field} />
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
              />
            )}
          />

          <CustomButton
            type="submit"
            className=" bg-[#A85334] w-full"
            disabled={isPending}
            isLoading={isPending}
          >
            Log in
          </CustomButton>
        </form>
      </Form>
      <div className="mt-4 flex gap-2 justify-center lg:justify-start">
        <p className="">Don&apos;t have an account?</p>
        <Link href="/auth/signup" className="text-[#A85334]">
          Sign up
        </Link>
      </div>
    </AuthSection>
  );
};

export default SignIn;
