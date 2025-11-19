import "react-day-picker/style.css";
import type {
	FieldValue,
	SelectOption,
} from "@/src/components/Shared/Form/types";
import Text from "@/src/components/Shared/Text/Text";

const resultsDropdownStyle =
	"absolute z-50 rounded-[10px] bg-white border-[1.5px] border-grey-200 shadow-lg max-h-60 overflow-y-auto";
const noResultDropdownStyle =
	"absolute z-50 rounded-[10px] bg-white border-[1.5px] border-grey-200 shadow-lg px-3 py-2 text-gray-400";

interface Props {
	name: string;
	selectedOption?: SelectOption;
	options: SelectOption[];
	onChange: (fieldName: string, value: FieldValue) => void;
	onClose: () => void;
}

const OptionsDropdown = ({
	name,
	selectedOption,
	options,
	onChange,
	onClose,
}: Props) => {
	const hasOptions = options.length > 0;

	return (
		<>
			{hasOptions ? (
				<div className={resultsDropdownStyle}>
					{options.map((option) => {
						const isSelected = option.value === selectedOption?.value;
						const isSelectedStyles = "bg-orange/70 hover:bg-orange/70";
						return (
							<button
								name={name}
								key={option.value}
								value={option.value}
								type="button"
								onClick={(e) => {
									onChange(name, option.value);
									onClose();
								}}
								className={`w-full text-left px-3 py-2 cursor-pointer hover:bg-gray-100 ${isSelected ? isSelectedStyles : ""}`}
							>
								{option.label}
							</button>
						);
					})}
				</div>
			) : (
				<div className={noResultDropdownStyle}>
					<Text value={"No options found"} />
				</div>
			)}
		</>
	);
};

export default OptionsDropdown;
