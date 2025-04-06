import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const keyVaultName = process.env.KEY_VAULT_NAME;
const vaultUrl = `https://${keyVaultName}.vault.azure.net`;

export const getKeyVaultSecret = async (secretName: string) => {
    try {
        if (!secretName) {
            throw new Error("Missing secretName parameter");
        }
        const credential = new DefaultAzureCredential();
        const client = new SecretClient(vaultUrl, credential);
        const secret = await client.getSecret(secretName);
        return secret.value;
    } catch(error) {
        console.error("Error fetching secret from Key Vault:", error);
        throw error;
    }
}

const nextAuthSecretMap = [
    {
        name: "AZURE_CLIENT_ID",
        secretName: "AZURE-CLIENT-ID",
    }, {
        name: "AZURE_CLIENT_SECRET",
        secretName: "AZURE-CLIENT-SECRET",
    },
    {
        name: "AZURE_TENANT_ID",
        secretName: "AZURE-TENANT-ID",
    },
    {
        name: "NEXTAUTH_SECRET",
        secretName: "NEXTAUTH-SECRET",
    }
] as const;

export type NextAuthSecrets = Partial<
  Record<(typeof nextAuthSecretMap)[number]["name"], string>
>;

export const loadNextAuthSecrets = async () => {
    let secrets: NextAuthSecrets = {};
    await Promise.all(nextAuthSecretMap.map(async (item) => {
        secrets[item.name] = await getKeyVaultSecret(item.secretName);
    } ))
    return secrets;
}