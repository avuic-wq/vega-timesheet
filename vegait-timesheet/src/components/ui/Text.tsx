interface Props {
	value: string;
	className?: string;
}

export default function Text({ value, className }: Props) {
	return <p className={className}>{value}</p>;
}
