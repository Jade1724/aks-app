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
  cookies: {
    sessionToken: {
      name: process.env.TOKEN_NAME!,
      options: {
        httpOnly: false,
        sameSite: "none",
        secure: false,
      },
    },
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
        maxAge: 900,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
});

export { handler as GET, handler as POST };
