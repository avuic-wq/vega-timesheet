import type {
	AuthFormActions,
	AuthFormDataMap,
	AuthFormMode,
	QueryState,
} from "@/src/components/Shared/Form/types";
import { loginAction, registerAction } from "@/src/server-actions/auth/actions";

type AuthHandlersMap = {
	[K in AuthFormMode]: {
		onSubmit: (
			data: AuthFormDataMap[K],
		) => Promise<QueryState<AuthFormDataMap[K]>>;
	};
};

type FactoryProps<M extends AuthFormMode> = {
	mode: M;
};

const authFormActionsFactory = <M extends AuthFormMode>({
	mode,
}: FactoryProps<M>): AuthFormActions<AuthFormDataMap[M]> => {
	const handlersMap: AuthHandlersMap = {
		login: {
			onSubmit: (data) => loginAction(data),
		},
		register: {
			onSubmit: (data) => registerAction(data),
		},
	};

	return handlersMap[mode];
};

export default authFormActionsFactory;
