"use server";
export const testEnvVars = async () => {
  return {
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  };
};
