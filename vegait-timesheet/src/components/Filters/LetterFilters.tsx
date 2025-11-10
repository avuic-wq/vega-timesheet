import FilterItem from "./FilterItem";

const allLettersInAlphabet = Array.from({ length: 26 }, (_, i) =>
	String.fromCharCode(65 + i),
);

interface Props {
	letters: string[];
}

const LetterFilters = ({ letters }: Props) => {
	return (
		<div className="flex justify-between">
			{allLettersInAlphabet.map((letter) => (
				<FilterItem
					key={letter}
					value={letter}
					isDisabled={!letters.includes(letter)}
				/>
			))}
		</div>
	);
};

export default LetterFilters;
