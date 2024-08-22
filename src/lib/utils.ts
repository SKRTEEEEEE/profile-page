import { ThirdwebClientConfig } from "@/core/infrastructure/adapters/thirdweb-auth-adapter";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function validateStringField(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || !value) {
    throw new Error(`Error with ${fieldName}: must be a non-empty string`);
  }
  return value;
}

const getClient = new ThirdwebClientConfig()
export const client = getClient.client