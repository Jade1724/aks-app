import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { NextRequest } from "next/server";

const keyVaultName = process.env.KEY_VAULT_NAME;
const vaultUrl = `https://${keyVaultName}.vault.azure.net`;

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const secretName = searchParams.get("secretName");

    if (!secretName) {
      return Response.json(
        { error: "Missing secretName parameter" },
        { status: 400 }
      );
    }

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(vaultUrl, credential);

    const secret = await client.getSecret(secretName);

    return Response.json({ secret: secret.value });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
