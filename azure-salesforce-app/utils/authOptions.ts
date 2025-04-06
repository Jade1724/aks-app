import AzureADProvider from "next-auth/providers/azure-ad";
import { getKeyVaultSecret, loadNextAuthSecrets } from "./authSecrets";
import { AuthOptions } from "next-auth";

export const getAuthOptions = async (): Promise<AuthOptions> => {
  const secret = await loadNextAuthSecrets();

  return {
    providers: [
      AzureADProvider({
        clientId: secret.AZURE_CLIENT_ID as string,
        clientSecret: secret.AZURE_CLIENT_SECRET as string,
        tenantId: secret.AZURE_TENANT_ID,
      }),
    ],
    secret: secret.NEXTAUTH_SECRET, // Secret for JWT
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/auth/signin",
    },
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
      callbackUrl: {
        name: `next-auth.callback-url`,
        options: {
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
      state: {
        name: `next-auth.state`,
        options: {
          sameSite: "none",
          path: "/",
          secure: true,
          maxAge: 900,
        },
      },
      csrfToken: {
        name: `next-auth.csrf-token`,
        options: {
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
    },
  };
};
