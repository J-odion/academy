import React, { useContext, createContext, useState, useEffect } from "react";
import { useStorage } from "@/lib/useStorage";
import { useRouter } from "next/router";
import { axiosInstance } from "../hooks/axiosInstance";
import { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken, removeAccessToken, removeRefreshToken } from "@/services/authService";

type AuthType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
  clearAuthTokens: () => void;
};

export const AuthContext = createContext<AuthType>({
  accessToken: null,
  refreshToken: null,
  setAuthTokens: () => {},
  clearAuthTokens: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const [accessToken, setAccessTokenState] = useState<string | null>(getAccessToken());
  const [refreshToken, setRefreshTokenState] = useState<string | null>(getRefreshToken());


  useEffect(() => {
    setAccessToken(accessToken ?? '');
    setRefreshToken(refreshToken ?? '');
  }, [accessToken, refreshToken]);

  const setAuthTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessTokenState(newAccessToken);
    setRefreshTokenState(newRefreshToken);
  };

  const clearAuthTokens = () => {
    setAccessTokenState(null);
    setRefreshTokenState(null);
    removeAccessToken();
    removeRefreshToken();
  };


  const value: AuthType = {
    accessToken,
    refreshToken,
    setAuthTokens,
    clearAuthTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
