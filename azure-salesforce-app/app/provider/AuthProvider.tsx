"use client";

import { SessionProvider } from "next-auth/react";
import Protected from "./Protected";

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Protected>{children}</Protected>
    </SessionProvider>
  );
};

export default AuthProvider;
