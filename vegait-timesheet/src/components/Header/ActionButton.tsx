"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/src/components/Icon";
import { Modal } from "@/src/components/Modal/Modal";
import Text from "@/src/components/Text";
import { config } from "./config";

interface Props {
	show?: boolean;
}

const ActionButton = ({ show }: Props) => {
	const [isActionModalOn, setIsActionModalOn] = useState<boolean>(false);
	const pathname = usePathname();
	const { actionText } = config[pathname];

	return (
		<>
			{show && (
				<div className="flex justify-left align-center gap-2 cursor-pointer w-fit">
					<Icon name="plus" onClick={() => {}} />
					<Text value={actionText} className="body-md" />
				</div>
			)}
			<Modal isOpen={isActionModalOn} onClose={() => setIsActionModalOn(false)}>
				TEST CONTENT
				{/* <CreateClientForm /> */}
				{/* TO-DO: Later can be optimized to be <CreateForm /> and work with multiple entities based on config */}
			</Modal>
		</>
	);
};

export default ActionButton;
