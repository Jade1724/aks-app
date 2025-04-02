"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.close();
    }
  }, [status]);

  useEffect(() => {
    signIn("azure-ad", {
      redirect: false,
    });
  }, []);

  return <></>;
}
