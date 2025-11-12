import Button from "@/src/components/Button/Button";
import { renderField } from "./renderField";
import type { FormConfig } from "./types";

type Props = {
	config: FormConfig;
};

const EditForm = ({ config }: Props) => {
	// TO-DO: Validate form data with zod before mutating
	// TO-DO: Disable button if a required field is empty
	return (
		<div className="flex flex-col justify-center gap-4 mb-3">
			<form className="flex flex-col gap-4 w-full mb-4">
				{config?.fields?.map((field) => {
					return renderField(field);
				})}
			</form>
			<div className="flex justify-center flex-col items-center gap-3">
				{config.buttons.map((button) => {
					return (
						<Button
							type="submit"
							key={button.text}
							variant={button.variant}
							isDisabled={button.isDisabled}
							className="w-3/5"
						>
							{button.text}
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default EditForm;
