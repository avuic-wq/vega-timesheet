import type {
	FormState,
	LoginFormData,
	RegisterFormData,
} from "@/src/components/Shared/Form/types";

export type LoginActionResult = Promise<FormState<LoginFormData>>;
export type RegisterActionResult = Promise<FormState<RegisterFormData>>;
