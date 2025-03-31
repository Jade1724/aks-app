"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { testEnvVars } from "../server/test";
import { useEffect, useState } from "react";
import "@salesforce/canvas-js-sdk";

const Protected = ({ children }: React.PropsWithChildren) => {
  const [envVars, setEnvVars] = useState<object>();
  const { status } = useSession();

  const getEnvVars = async () => {
    const envVars = await testEnvVars();
    setEnvVars(envVars);
  };
  useEffect(() => {
    getEnvVars();
  }, []);

  if (status === "loading") {
    return <p>Loading... {JSON.stringify(envVars)}</p>;
  }
  if (status === "authenticated") {
    return (
      <div>
        {children} {JSON.stringify(envVars)}{" "}
      </div>
    );
  }

  return (
    <Link href="/api/auth/signin">
      Sign in {JSON.stringify(envVars)} <h1>cross-site-cookie16</h1>
    </Link>
  );
};

export default Protected;
