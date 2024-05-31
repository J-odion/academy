import React, {useState} from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { deleteCheckboxSchema } from "@/lib/formSchema";
import FormRender from "@/components/FormRender";
import AccountDeletedModal from "./AccountDeletedModal";

type ModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const items = [
  {
    id: "temporary",
    label: "This is temporary, i'll be back",
  },
  {
    id: "privacy",
    label: "I have privacy concern",
  },
  {
    id: "hacked",
    label: "My account was hacked",
  },
  {
    id: "useless",
    label: "I don't find FanCity useful",
  },
  {
    id: "multiple",
    label: "I have another account",
  },
] as const;

const DeleteAccountModal = ({
  title,
  open,
  setOpen,
  className,
}: ModalProps) => {
  const form = useForm<z.infer<typeof deleteCheckboxSchema>>({
    resolver: zodResolver(deleteCheckboxSchema),
    defaultValues: {
      items: ["temporary", "privacy, hacked, useless, multiple, password, reason"],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
//   const { register, handleSubmit, reset } = form;

  const onSubmit = async (data: z.infer<typeof deleteCheckboxSchema>) => {
    console.log(data);
    setOpen(false);
    setIsLoading(true);
    // setModalOpen(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setAccountDeleted(true);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-10 sm:rounded-md bg-[#F0EAE8]">
        <DialogTitle
          className={cn(
            `text-center pb-2 pt-8 text-xl font-medium text-black`,
            className
          )}
        >
          {title}
        </DialogTitle>
        <DialogDescription className="text-center text-sm text-gray-500">
          Deleting your account is permanent, you won&apos;t be able to retrieve
          your account
        </DialogDescription>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="items.0"
                render={() => (
                  <FormItem>
                    <Label>Other (Please explain further)</Label>
                    <Textarea
                      className=""
                      id="name"
                      placeholder="Reason for deleting account"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="items.1"
                render={({ field }) => (
                  <FormRender
                    label="Password"
                    placeholder="Enter your password"
                    field={field}
                    type="password"
                  />
                )}
              />

              <CustomButton
                type="submit"
                className="w-full bg-[#A85334]"
                disabled={isLoading}
                isLoading={isLoading}
              >Delete account</CustomButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
    {accountDeleted && (
        <AccountDeletedModal open={true} setOpen={setAccountDeleted} />
      )}
    </>

  );
};

export default DeleteAccountModal;
