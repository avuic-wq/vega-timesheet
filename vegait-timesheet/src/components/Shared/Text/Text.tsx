import { twMerge } from "tailwind-merge";

interface Props {
	value?: string;
	className?: string;
}

const Text = ({ value, className }: Props) => {
	const defaultCursor = "cursor-default";
	const styles = twMerge(defaultCursor, className);
	return <p className={styles}>{value}</p>;
};

export default Text;
