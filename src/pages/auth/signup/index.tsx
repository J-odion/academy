import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import { TypographyH1, TypographyH3 } from "@/components/typography";
import { signUpFormSchema } from "@/lib/formSchema";
import { NextPageWithLayout } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormRender from "@/components/FormRender";
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
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
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

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
      telephone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const payload = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      role: 'student',
      username: values.username,
      telephone: values.telephone,
    };

    try {
      // setLoading(true);
      await AuthConfirmOtp({ email: payload.email, otp_code: "" });
      localStorage.setItem("signUpFormData", JSON.stringify(payload));
      localStorage.setItem("role", payload.role);
      router.push(`/auth/confirm?email=${payload.email}`);
    } catch (error) {
      setLoading(false);
      toast({
        title: `User already exists`,
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start my-8 lg:mb-8 lg:pl-8 ">
        {/* <TypographyH1 className="mb-4 text-3xl lg:text-5xl">Hi, create an account to get started</TypographyH1>
        <p className="mb-4 text-lg">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#A85334]">
            Log in
          </Link>
        </p> */}

        <div className="flex justify-center flex-col mb-1 lg:mb-10 top-0">
          <Link href="/" className="text-[#A85334]">
            <Image
              className="h-[100px] w-[100px] mx-auto lg:mx-0 mb-0 lg:mb-4 "
              src="/SGALOGO.svg"
              width={50}
              height={50}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <TypographyH1 className="mb-4 w-full text-center lg:text-left">
          Hi, create an account to get started
        </TypographyH1>
        <p className="mb-4 hidden lg:flex lg:w-full w-[400px]  text-center lg:text-left">
          Welcome to the largest guitar academy in Africa where we guide you
          through every step of your guitar journey!
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div className="space-y-4 lg:space-y-0 lg:gap-5 lg:flex my-auto justify-center items-center align-middle w-full">
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
            </div>

            <div className="space-y-4 lg:space-y-0 lg:gap-5 lg:flex my-auto justify-center items-center align-middle">
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
                    label="Username *(Stage Name)"
                    placeholder="Enter your username or Stage Name"
                    field={field}
                  />
                )}
              />
            </div>

            <div className="space-y-4 lg:space-y-0 lg:gap-5 lg:flex my-auto justify-center items-center align-middle">
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
                name="telephone"
                render={({ field }) => (
                  <FormRender
                    label="Telephone"
                    placeholder="Phone Number"
                    field={field}
                    type="telephone"
                  />
                )}
              />
            </div>

            <CustomButton
              type="submit"
              className="bg-[#A85334] w-full mx-auto flex justify-center p-3 rounded text-white hover:bg-[#A85334]/50"
              disabled={loading}
              isLoading={loading}
            >
              {loading ? (<Loader2Icon size={20} />) : "Sign Up"}
            </CustomButton>
          </form>
        </Form>
        <div className="mt-4 flex gap-2 justify-center lg:justify-start">
          <p className="">Already have an account?</p>
          <Link href="/auth/login" className="text-[#A85334] hover:underline">
            Log in
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
    </div>
  );
};

export default SignUp;
