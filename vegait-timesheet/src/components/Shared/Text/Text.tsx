import { twMerge } from "tailwind-merge";

interface Props {
	value?: string;
	className?: string;
}

const Text = ({ value, className }: Props) => {
	const style = twMerge("hover:cursor-default", className);
	return <p className={style}>{value}</p>;
};

export default Text;
