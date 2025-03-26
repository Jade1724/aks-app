"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const Protected = ({ children }: React.PropsWithChildren) => {
  const { data: session, status } = useSession();

  console.log("session", session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    return <div>{children} </div>;
  }

  return <Link href="/api/auth/signin">Sign in</Link>;
};

export default Protected;
