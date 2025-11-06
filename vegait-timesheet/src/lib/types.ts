import { AUTH_ERRORS_KEYS } from "./consts";

export type AuthErrorKey = typeof AUTH_ERRORS_KEYS[keyof typeof AUTH_ERRORS_KEYS];