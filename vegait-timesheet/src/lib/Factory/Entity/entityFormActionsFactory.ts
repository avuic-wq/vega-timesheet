import type {
	EntityFormActions,
	EntityFormDataMap,
	EntityFormMode,
	EntityType,
	FormState,
} from "@/src/components/Shared/Form/types";
import {
	createClientAction,
	deleteClientAction,
	updateClientAction,
} from "@/src/server-actions/clients/actions";
import {
	createProjectAction,
	deleteProjectAction,
	updateProjectAction,
} from "@/src/server-actions/projects/actions";

type EntityHandlersMap = {
	[K in EntityType]: {
		create: (
			data: EntityFormDataMap[K],
		) => Promise<FormState<EntityFormDataMap[K]>>;
		update: (
			data: EntityFormDataMap[K],
		) => Promise<FormState<EntityFormDataMap[K]>>;
		delete: () => Promise<FormState<EntityFormDataMap[K]>>;
	};
};

interface FactoryProps<E extends EntityType> {
	mode: EntityFormMode;
	entityType: E;
	entityId?: string;
}

export const entityFormActionsFactory = <E extends EntityType>({
	mode,
	entityType,
	entityId = "",
}: FactoryProps<E>): EntityFormActions<EntityFormDataMap[E]> => {
	const handlersMap: EntityHandlersMap = {
		client: {
			create: (data) => createClientAction(data),
			update: (data) => updateClientAction(entityId, data),
			delete: () => deleteClientAction(entityId),
		},
		project: {
			create: (data) => createProjectAction(data),
			update: (data) => updateProjectAction(entityId, data),
			delete: () => deleteProjectAction(entityId),
		},
	};

	const handler = handlersMap[entityType];

	return {
		onSubmit: mode === "create" ? handler.create : handler.update,
		onDelete: mode === "edit" ? handler.delete : undefined,
	};
};
