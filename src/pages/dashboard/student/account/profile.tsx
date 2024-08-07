import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/students_dashboard/DashboardLayout";
import DashboardSidebar from "@/components/layout/students_dashboard/DashboardSidebar";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import ChangePasswordModal from "@/components/modal/student_dashboard/ChangePasswordModal";
import DeleteAccountModal from "@/components/modal/student_dashboard/DeleteAccountModal";
import AccountDeletedModal from "@/components/modal/student_dashboard/AccountDeletedModal";
import {
  useChangeEmail,
  useChangeName,
  useChangePassword,
  useChangeProfilePicture,
  useGetProfilePicture,
} from "../../../../../hooks/profile";
import { useDeleteUserAccount } from "../../../../../hooks/deleteAccount";
import { useStorage } from "@/lib/useStorage";
import ChangeProfilePictureModal from "@/components/modal/student_dashboard/ChangeProfilePictureModal";
import ChangeNameModal from "@/components/modal/student_dashboard/ChangeNameModal";

const Profile: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [openDeletedModal, setOpenDeletedModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openProfilePictureModal, setOpenProfilePictureModal] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);

  const { mutate: changeName, isPending } = useChangeName();
  const { mutate: changeEmail } = useChangeEmail();
  const { mutate: changePassword } = useChangePassword();
  const { mutate: changeProfilePicture } = useChangeProfilePicture();
  const { data: profilePictureData } = useGetProfilePicture();
  console.log('Profile Picture:', profilePictureData);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const firstName = useStorage.getItem("studentFirstName");
    const lastName = useStorage.getItem("studentLastName");
    const storedEmail = useStorage.getItem("studentEmail");
    setFullName(`${firstName} ${lastName}`);
    setEmail(storedEmail);
  }, []);

  const handleSaveChanges = () => {
    if (newName) {
      changeName({ name: newName });
    }

    if (newEmail) {
      changeEmail({ email: newEmail });
    }

    if (newPassword) {
      changePassword({ password: newPassword });
    }

    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      changeProfilePicture(formData);
    }
  };

  const handleChangePasswordModal = () => {
    setOpen(!open);
  };

  const handleProfilePictureModal = () => {
    setOpenProfilePictureModal(!openProfilePictureModal);
  };

  const handleNameModal = () => {
    setOpenNameModal(!openNameModal);
  };

  const handleDeleteAccountModal = () => {
    setOpenDelete(!openDelete);
  };

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicture(event.target.files[0]);
    }
  };

  return (
    <DashboardSidebar>
      <div className="w-full mt-20 md:mt-20 px-6">
        <div className="flex justify-between">
          <h1 className="font-medium text-2xl mb-8">Profile</h1>
          <Button
            variant={"link"}
            className="text-[#A85334]"
            onClick={handleDeleteAccountModal}
          >
            Delete account
          </Button>
        </div>
        <div className="flex flex-col space-y-6 md:space-y-16">
          <div className="flex items-center gap-[27px]">
            <div className="md:w-44 md:h-44 w-28 h-28 ">
              <Avatar className="w-full h-full rounded-[37px] md:rounded-[56px]">
                <AvatarImage
                  src={profilePictureData || "https://github.com/shadcn.png"}
                  alt="avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:ml-8 flex flex-col gap-2">
              {fullName ? (
                <h1 className="text-lg md:text-2xl font-bold">{fullName}</h1>
              ) : (
                <h1 className="text-lg md:text-2xl font-bold">John Doe</h1>
              )}
              {email ? (
                <p className="text-sm md:text-base text-[#A85334]">{email}</p>
              ) : (
                <p className="text-sm md:text-base text-[#A85334]">
                  johndoe@example.com
                </p>
              )}
            </div>
          </div>

          <div className="md:w-2/3 w-full">
            <Accordion
              type="single"
              collapsible
              className="space-y-4 md:space-y-6"
            >
              <div
                className="border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6 flex justify-between items-center h-[3.1em] cursor-pointer"
                onClick={handleNameModal}
              >
                <p className="font-normal text-sm">Change name</p>
                <ChevronRight size={14} className="text-[#D06B0D]" />
              </div>
              <AccordionItem
                value="item-2"
                className="bg-[#FDF4E9] border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6"
              >
                <AccordionTrigger className="font-normal text-sm">
                  Change email address
                </AccordionTrigger>
                <AccordionContent>
                  <Input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New email"
                  />
                </AccordionContent>
              </AccordionItem>
              <div
                className="border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6 flex justify-between items-center h-[3.1em] cursor-pointer"
                onClick={handleProfilePictureModal}
              >
                <p className="font-normal text-sm">Change profile image</p>
                <ChevronRight size={14} className="text-[#D06B0D]" />
              </div>
              <div
                className="border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6 flex justify-between items-center h-[3.1em] cursor-pointer"
                onClick={handleChangePasswordModal}
              >
                <p className="font-normal text-sm">Change password</p>
                <ChevronRight size={14} className="text-[#D06B0D]" />
              </div>
            </Accordion>

            <Button className="mt-6 bg-[#A85334]" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        open={open}
        setOpen={setOpen}
        title="Change Password"
      />
      <ChangeProfilePictureModal
        open={openProfilePictureModal}
        setOpen={setOpenProfilePictureModal}
        title="Change Profile Picture"
      />
      <ChangeNameModal
        open={openNameModal}
        setOpen={setOpenNameModal}
        setNewName={setNewName}
        title="Change Name"
      />
      <DeleteAccountModal
        open={openDelete}
        setOpen={setOpenDelete}
        title="Are you sure you want to delete your account"
      />
      <AccountDeletedModal
        open={openDeletedModal}
        setOpen={setOpenDeletedModal}
      />
    </DashboardSidebar>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"dashboard"}>{page}</DashboardLayout>;
};
