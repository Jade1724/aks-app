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