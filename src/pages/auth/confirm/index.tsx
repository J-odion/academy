import AuthLayout from "@/components/layout/auth/AuthLayout";
import AuthSection from "@/components/layout/auth/AuthSection";
import { TypographyH1, TypographyH3 } from "@/components/typography";
import { emailVerificationSchema } from "@/lib/formSchema";
import { NextPageWithLayout } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import VerifyModal from "@/components/modal/auth/VerifyModal";
import { useMutation } from "@tanstack/react-query";
import { AuthConfirmOtp, AuthSignUp, ResendOtp } from "../../../../hooks/auth";
import {useStorage} from "@/lib/useStorage";
import { QUERY_KEYS } from "@/lib/utils";
import { ConfirmOtpProps, SignUpProps } from "../../../../hooks/auth/types";
import Image from "next/image";
import Link from "next/link";

const EmailVerification: NextPageWithLayout = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const email = router.query.email as string;
  // const { getItem } = useStorage();

  const form = useForm<z.infer<typeof emailVerificationSchema>>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp_code: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.signUp],
    mutationFn: (data: SignUpProps) => AuthSignUp(data),
    onSuccess: () => {
      setModalOpen(true);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Something went wrong!",
        description: "Unable to verify OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof emailVerificationSchema>) => {
    const storedFormData = localStorage.getItem("signUpFormData");
    console.log(storedFormData);
    localStorage.getItem("role");
    // const accountId = localStorage.getItem('accountId');

    if (!storedFormData) {
      toast({
        title: "Something went wrong!",
        description: "Unable to retrieve sign-up data.",
        variant: "destructive",
      });
      return;
    }

    const signUpData = JSON.parse(storedFormData);
    const payload = {
      ...signUpData,
      otp: values.otp_code,
    };

    console.log(payload);
    mutate(payload);

    // confirmOtpMutation.mutate(payload, {
    //   onSuccess: () => {
    //     setModalOpen(true);
    //     router.push(`/dashboard/${localStorage.getItem('role')}/account`);
    //   },
    //   onError: (error) => {
    //     console.error("Mutation error:", error);
    //     toast({
    //       title: "Something went wrong!",
    //       description: "Unable to verify OTP. Please try again.",
    //       variant: "destructive",
    //     });
    //   }
    // });
  };

  const handleResendClick = async () => {
    if (!resendDisabled) {
      setResendDisabled(true);
      setCountdown(59);

      try {
        await ResendOtp({ storedFormData: useStorage.getItem("signUpFormData")});
        toast({
          title: "OTP Resent",
          description: `A new OTP has been sent to ${email}`,
        });
      } catch (error) {
        toast({
          title: "Something went wrong!",
          description: "Unable to resend OTP. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // useEffect(() => {
  //   if (countdown > 0 && resendDisabled) {
  //     const timer = setInterval(() => {
  //       setCountdown(countdown - 1);
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   } else if (countdown === 0 && resendDisabled) {
  //     setResendDisabled(false);
  //   }
  // }, [countdown, resendDisabled]);

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

      <TypographyH3 className="mb-4 w-full text-center lg:text-left">
        We have sent an OTP code to your email. We can&apos;t wait to have you
        on board
      </TypographyH3>
      <p className="text-[#6b7280] mb-8 w-full text-center lg:text-left">
        Enter the 6-digit code we sent to{" "}
        <span className="text-[#E89222]">{email}</span>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp_code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="space-x-4">
                      <InputOTPSlot
                        index={0}
                        {...form.register("otp_code")}
                        className="bg-[#1E1E1E0D] "
                      />
                      <InputOTPSlot
                        index={1}
                        {...form.register("otp_code")}
                        className="bg-[#1E1E1E0D]"
                      />
                      <InputOTPSlot
                        index={2}
                        {...form.register("otp_code")}
                        className="bg-[#1E1E1E0D]"
                      />
                      <InputOTPSeparator />
                      <InputOTPSlot
                        index={3}
                        {...form.register("otp_code")}
                        className="bg-[#1E1E1E0D]"
                      />
                      <InputOTPSlot
                        index={4}
                        {...form.register("otp_code")}
                        className="bg-[#1E1E1E0D]"
                      />
                      <InputOTPSlot
                        index={5}
                        {...form.register("otp_code")}
                        className="bg-[#1E1E1E0D]"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <CustomButton
            type="submit"
            className="bg-[#A85334] w-full lg:w-[25%]"
            disabled={isPending}
            isLoading={isPending}
          >
            Verify Account
          </CustomButton>
        </form>
      </Form>
      <div className="flex items-center justify-center lg:justify-start gap-2 mt-6">
        <p className="text-[#6b7280]">Didn&apos;t receive the code?</p>
        <button
          type="button"
          onClick={handleResendClick}
          className="text-[#E89222] focus:outline-none cursor-pointer"
          disabled={resendDisabled}
        >
          Resend
        </button>
      </div>
      {modalOpen && <VerifyModal open={modalOpen} setOpen={setModalOpen} />}
    </AuthSection>
  );
};

export default EmailVerification;

EmailVerification.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout page={"emailVerification"}>{page}</AuthLayout>;
};
