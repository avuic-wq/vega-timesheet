interface Props {
	value?: string;
	className?: string;
}

const Text = ({ value, className }: Props) => {
	return <p className={className}>{value}</p>;
};

export default Text;
