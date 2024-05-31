import React, { useContext, createContext } from "react";
import useStorage from "@/lib/useStorage";
import { useRouter } from "next/router";

type AuthType = {
  logOut: () => void;
};

export const AuthContext = createContext<AuthType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { removeItem } = useStorage();
  const router = useRouter();


  const logOut = () => {
    removeItem("signUpFormData");
    removeItem("role");
    router.reload();
  };

  // const setUpLogin = (data: { access: string;}) => {
  //   setItem("access-token", JSON.stringify(data?.access));
  //   // setItem("refresh-token", JSON.stringify(data?.refresh));
  // };


  const value: AuthType = {
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
