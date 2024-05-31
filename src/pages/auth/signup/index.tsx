import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import { TypographyH1 } from "@/components/typography";
import { signUpFormSchema } from "@/lib/formSchema";
import { NextPageWithLayout } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormRender from "@/components/FormRender";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import { SignUpProps, ConfirmOtpProps } from "../../../../hooks/auth/types";
import { useMutation } from "@tanstack/react-query";
import { AuthSignUp, AuthConfirmOtp } from "../../../../hooks/auth";
import { QUERY_KEYS } from "@/lib/utils";
import { useAuth } from "../../../../context/auth.context";


const SignUp: NextPageWithLayout = () => {
  const { toast } = useToast();
  // const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      // confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
      role: "",
    },
  });




  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const payload = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      username: values.username,
    };



    try {
      await AuthConfirmOtp({ email: payload.email, otp_code: "" });
      localStorage.setItem('signUpFormData', JSON.stringify(payload));
      localStorage.setItem('role', payload.role);
      router.push(`/auth/confirm?email=${payload.email}`);
    } catch (error) {
      toast({
        title: `User already exists`,
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <AuthSection>
      <TypographyH1 className="mb-4">Hi, create an account to get started</TypographyH1>
      <p className="">
            Already have an account?{" "}
            <Link href="/Auth/login" className="text-[#A85334]">
              Log in
            </Link>
          </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormRender
                  label="First Name"
                  placeholder="Enter your First Name"
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormRender
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  field={field}
                />
              )}
            />


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormRender
                label="Email"
                placeholder="Enter your email"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormRender
                label="Username"
                placeholder="Enter your username"
                field={field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormRender
                label="Password"
                placeholder="Enter your password"
                field={field}
                type="password"
              />
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormRender
                label="role"
                placeholder="role"
                field={field}
                type="role"
              />
            )}
          />


          <CustomButton
            type="submit"
            className=" bg-[#A85334] w-full hover:bg-[#A85334]/50 "
            // disabled={isPending}
            // isLoading={isPending}
          >
            Sign Up
          </CustomButton>


        </form>
      </Form>
    </AuthSection>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout page={"signUp"}>{page}</AuthLayout>;
};
