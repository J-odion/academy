import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import { TypographyH1 } from "@/components/typography";
import { signUpFormSchema } from "@/lib/formSchema";
import { NextPageWithLayout } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormRender from "@/components/FormRender";
import React, {useState} from "react";
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
import Image from "next/image";
import { Loader2Icon } from "lucide-react";

const SignUp: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start my-8 lg:mb-0 lg:pl-8 ">
        <TypographyH1 className="mb-4 text-3xl lg:text-5xl">Hi, create an account to get started</TypographyH1>
        <p className="mb-4 text-lg">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#A85334]">
            Log in
          </Link>
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 max-w-sm">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormRender
                  label="First Name"
                  placeholder="Enter your First Name"
                  field={field}
                  className="w-full p-3 border border-gray-300 rounded"
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
                  className="w-full p-3 border border-gray-300 rounded"
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
                  className="w-full p-3 border border-gray-300 rounded"
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
                  className="w-full p-3 border border-gray-300 rounded"
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
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormRender
                  label="Role"
                  placeholder="Enter your role"
                  field={field}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              )}
            />

            <CustomButton
              type="submit"
              className="bg-[#A85334] w-full p-3 rounded text-white hover:bg-[#A85334]/50"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? <Loader2Icon className="animate-spin" /> : "Sign Up"}
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

export default SignUp;
