import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Bell,
  BellOff,
  Loader2Icon,
  MailOpen,
  Trash2,
  BookOpen,
} from "lucide-react";
import Moment from "react-moment";
import { Button } from "@/components/ui/button";

type NotificationModalProps = {
  notifications: any;
  notificationRefetch: any;
};

const handleReadNotification = (id: number) => {
  console.log(id);
};

const handleDeleteNotification = (id: number) => {
  console.log(id);
};

const NotificationModal = ({
  notifications,
  notificationRefetch,
}: NotificationModalProps) => {
  const [loadingStates, setLoadingStates] = useState<any>({});
  const [deletingState, setDeletingState] = useState<any>({});

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <div className="relative cursor-pointer">
              {notifications?.count > 0 && (
                <span className="absolute right-[1px] top-[-2px] flex h-3 w-3 items-center justify-center rounded-full bg-red-700 text-white"></span>
              )}{" "}
              <Bell />
            </div>
          </MenubarTrigger>
          <MenubarContent
            className="h-screen w-[600px] overflow-y-auto"
            id="menu-content"
          >
            {" "}
            <div className="flex items-center justify-between">
              <h2 className="mr-2 text-xl">Notification</h2>
              <Button variant={"link"} className="text-[#A85334]">
                View all
              </Button>
            </div>
            <MenubarSeparator />
            <div className="">
              {notifications?.count > 0 ? (
                <>
                  {notifications?.results?.map((item: any, index: number) => (
                    <div className="" key={index}>
                      <div className="border-b-2 px-4 py-1 bg-[#FDF4E9] border-[1px] border-[#F0EAE8]">
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-[#4F4F4F] font-normal text-sm">
                            {!item?.is_read && (
                              <span className="mr-1 h-2 w-2  rounded-full bg-red-500" />
                            )}
                            <p className="uppercase">{item?.message}</p>
                            <p className="">Assessment scores have arrived</p>
                          </div>
                          <div className="ml-14 flex justify-end text-sm text-[#1E1E1E99]">
                          <Moment format="MM D, YYYY | HH:mm " withTitle>
                            {item?.created_at}
                          </Moment>
                        </div>
                          {/* <div className="ml-14 flex justify-end">
                            <button
                              onClick={() => handleReadNotification(item?.id)}
                              className="cursor-pointer"
                              disabled={loadingStates[item?.id]}
                            >
                              {loadingStates[item?.id] ? (
                                <Loader2Icon
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <>{!item?.is_read && <MailOpen size={14} />}</>
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteNotification(item?.id)}
                              className="cursor-pointer"
                              disabled={deletingState[item?.id]}
                            >
                              {deletingState[item?.id] ? (
                                <Loader2Icon
                                  size={14}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={14} color="red" />
                              )}
                            </button>
                          </div> */}
                        </div>

                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-6 text-center ">
                  <div className="flex items-center justify-center pb-3 pt-10">
                    <div className="rounded-full bg-[#f3f3f3] p-3 ">
                      <BellOff />
                    </div>
                  </div>
                  <div>No notifications yet.</div>
                </div>
              )}
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default NotificationModal;
