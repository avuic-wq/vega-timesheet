import Text from "@/src/components/Shared/Text/Text";

const daysOfTheWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const Header = () => {
	return (
		<>
			{daysOfTheWeek.map((day) => (
				<div key={day} className="flex justify-center">
					<Text value={day} />
				</div>
			))}
		</>
	);
};

export default Header;
