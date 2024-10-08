"use client";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export const GlobalProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <SessionProvider session={null}>{children}</SessionProvider>
      </Provider>
    </>
  );
};
