import React, { HTMLAttributes, InputHTMLAttributes, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

type FormRenderProps = {
  label?: string;
  placeholder: string;
  field: any;
  type?: string;
  classNameLabel?: string;
} & React.ComponentProps<"input">;

const FormRender = ({
  label,
  placeholder,
  field,
  classNameLabel,
  ...inputProps
}: FormRenderProps) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <FormItem className="w-full">
      <FormLabel className={cn(classNameLabel)}>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            placeholder={placeholder}
            {...field}
            {...inputProps}
            type={showPass ? "text" : inputProps.type}
            className="bg-[#F2E9DF] border-[#F2E9DF] text-[#A85334] rounded-lg h-12 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#F2E9DF] focus:border-transparent"
          />


          {inputProps.type === "password" ? (
            <Button
              type="button"
              variant={"ghost"}
              className="absolute right-0 top-0 text-[#A85334] hover:bg-transparent"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOffIcon size="18" /> : <EyeIcon size="18" />}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormRender;
