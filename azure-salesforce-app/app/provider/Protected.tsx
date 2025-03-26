"use client";

import { useSession } from "next-auth/react";

const Protected = ({ children }: React.PropsWithChildren) => {
  const { data: session, status } = useSession();

  console.log("session", session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    return <div>{children} </div>;
  }

  return <a href="/api/auth/signin">Sign in</a>;
};

export default Protected;
