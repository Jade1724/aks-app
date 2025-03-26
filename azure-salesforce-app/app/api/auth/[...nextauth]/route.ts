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
});

export { handler as GET, handler as POST };
