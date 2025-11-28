import { twMerge } from "tailwind-merge";

interface Props {
	value?: string;
	isClickable?: boolean
	className?: string;
}

const Text = ({ value, isClickable, className }: Props) => {
	const defaultCursor = "cursor-default";
	const pointerCursor = isClickable ? "cursor-pointer" : ""
	const styles = twMerge(defaultCursor, pointerCursor, className);
	return <p className={styles}>{value}</p>;
};

export default Text;
