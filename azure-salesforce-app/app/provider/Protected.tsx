"use client";

import { useSession } from "next-auth/react";
import { testEnvVars } from "../server/test";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Protected = ({ children }: React.PropsWithChildren) => {
  const [envVars, setEnvVars] = useState<object>();
  const { status } = useSession();
  const pathname = usePathname();

  const getEnvVars = async () => {
    const envVars = await testEnvVars();
    setEnvVars(envVars);
  };
  useEffect(() => {
    getEnvVars();
  }, []);

  const handlePopupSignIn = () => {
    const width = 600;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      "/auth/signin",
      "AzureSSO",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    // Poll the popup window to detect when it closes
    const timer = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(timer);
        window.location.reload(); // Refresh to check session status
      }
    }, 1000);
  };

  // Allow access to /auth/signin without protection
  if (pathname === "/auth/signin") {
    return children;
  }

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
    <button onClick={() => handlePopupSignIn()}>
      Sign in {JSON.stringify(envVars)} <h1>cross-site-cookie19</h1>
    </button>
  );
};

export default Protected;
