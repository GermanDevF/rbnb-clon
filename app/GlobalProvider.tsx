import { Toaster } from "react-hot-toast";

export const GlobalProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
