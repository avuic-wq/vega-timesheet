import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import type { FieldValue } from "@/src/components/Shared/Form/types";

const containerStyle =
	"absolute z-50 rounded-[10px] bg-white border-[1.5px] border-grey-200 shadow-lg max-h-60 overflow-y-auto";

interface Props {
	name: string;
	value?: string;
	onChange: (fieldName: string, value: FieldValue) => void;
	onClose: () => void;
}

const DropdownOptions = ({ name, value, onChange, onClose }: Props) => {
	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			onChange(name, format(date, "yyyy-MM-dd"));
			onClose();
		}
	};

	return (
		<div
			className={twMerge(
				containerStyle,
				"absolute z-50 w-full flex justify-center bg-white rounded-xl py-4 px-0 max-h-100",
			)}
		>
			<DayPicker
				mode="single"
				selected={new Date(Date.parse(value || ""))}
				onSelect={(date) => handleDateSelect(date)}
				classNames={{
					chevron: "fill-black",
					selected: "bg-orange/80 text-white",
					today: "rounded-4xl bg-grey-200",
				}}
			/>
		</div>
	);
};

export default DropdownOptions;
