import Button from "@/src/components/Button/Button";
import Text from "@/src/components/Text";
import { renderField } from "./renderField";
import type { FormConfig } from "./types";

type Props = {
	config: FormConfig;
};

const EditForm = ({ config }: Props) => {
	// TO-DO: Validate form data with zod before mutating
	// TO-DO: Disable button if a required field is empty
	// TO-DO: If select value != one of the options stop the submit
	return (
		<div className="flex flex-col justify-center gap-4 mb-3">
			<form className="flex flex-col gap-4 w-full mb-4">
				{config?.fields?.map((field) => {
					return (
						<div key={field.name} className="flex justify-between">
							<div className="w-full">{renderField(field)}</div>
							<div className="min-w-3">
								{field.isRequired && (
									<Text value="*" className="ml-1 font-bold text-red" />
								)}
							</div>
						</div>
					);
				})}
				<div className="flex justify-center flex-col items-center gap-3">
					{config.buttons.map((button) => {
						return (
							<Button
								type="submit"
								key={button.text}
								variant={button.variant}
								isDisabled={button.isDisabled}
								className="w-2/5"
							>
								{button.text}
							</Button>
						);
					})}
				</div>
			</form>
		</div>
	);
};

export default EditForm;
