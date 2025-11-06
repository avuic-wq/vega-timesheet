import { AuthErrorKey } from "./types";

export const DEFAULT_SALT_ROUNDS: number = 10

export const AUTH_PROVIDERS = {
    CREDENTIALS: "credentials"
}

export const AUTH_ERRORS_KEYS: Record<string, string> = {
    INVALID_CREDENTIALS: "CredentialsSigninsasdasd"
} as const;

export const AUTH_ERRORS_VALUES: Record<AuthErrorKey, string> = {
  CredentialsSignin: "Invalid username or password", 
};