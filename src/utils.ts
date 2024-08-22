import { ThirdwebClientConfig } from "./core/infrastructure/adapters/thirdweb-auth-adapter";

export function validateStringField(value: unknown, fieldName: string): string {
    if (typeof value !== 'string' || !value) {
      throw new Error(`Error with ${fieldName}: must be a non-empty string`);
    }
    return value;
  }

const getClient = new ThirdwebClientConfig()
export const client = getClient.client