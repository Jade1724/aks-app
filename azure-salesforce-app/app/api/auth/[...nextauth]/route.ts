import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

// NextAuth configuration
const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_CLIENT_ID as string,
      clientSecret: process.env.AZURE_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_TENANT_ID,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT
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
});

export { handler as GET, handler as POST };
