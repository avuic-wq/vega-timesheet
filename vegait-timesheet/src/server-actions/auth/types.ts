import type {
	LoginFormData,
	QueryState,
	RegisterFormData,
} from "@/src/components/Shared/Form/types";

export type LoginActionResult = Promise<QueryState<LoginFormData>>;
export type RegisterActionResult = Promise<QueryState<RegisterFormData>>;
