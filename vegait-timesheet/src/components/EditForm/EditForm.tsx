import { renderField } from "./renderField";
import type { FormConfig } from "./types";

type Props = {
	config: FormConfig;
};

const EditForm = ({ config }: Props) => {
	// TO-DO: Validate form data with zod before mutating

	return (
		<div className="flex flex-col justify-center gap-4 mb-3">
			<form className="flex flex-col gap-4 w-full">
				{config?.fields?.map((field) => {
					return renderField(field);
				})}
			</form>
			<div className="flex justify-center border-1">
				{config.buttons.map((button) => {
					return (
						<button type="submit" key={button.text}>
							{button.text}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default EditForm;
