import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Loader2Icon } from "lucide-react";

interface Props extends React.PropsWithChildren, ButtonProps {
  isLoading?: boolean;
}

function CustomButton({ children, isLoading, ...rest }: Props) {
  return (
    <Button {...rest}>
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}

export default CustomButton;
