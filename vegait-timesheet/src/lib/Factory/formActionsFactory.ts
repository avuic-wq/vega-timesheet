import type {
	EntityDataMap,
	EntityFormMode,
	EntityType,
	FormActions,
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
		create: (data: EntityDataMap[K]) => Promise<FormState<EntityDataMap[K]>>;
		update: (data: EntityDataMap[K]) => Promise<FormState<EntityDataMap[K]>>;
		delete: () => Promise<FormState<EntityDataMap[K]>>;
	};
};

interface FactoryProps<E extends EntityType> {
	mode: EntityFormMode;
	entityType: E;
	entityId?: string;
}

export const formActionsFactory = <E extends EntityType>({
	mode,
	entityType,
	entityId = "",
}: FactoryProps<E>): FormActions<EntityDataMap[E]> => {
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
