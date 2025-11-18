import Logo from "@/src/components/Shared/Logo/Logo";
import Text from "@/src/components/Shared/Text/Text";

const footerText =
	"Co-creators. Passionate innovators. We're your software development partners, working at the cutting edge of digital product development. We have the technical expertise and domain experience to help you push boundaries, regardless of your industry";
const copyrightText = "© Copyright Vega IT. All rights reserved.";

const Footer = () => {
	return (
		<div className="flex items-center justify-center bg-white rounded-[16px] py-12 pl-70 pr-240">
			<div className="flex items-left flex-col gap-8">
				<Logo />
				<Text value={footerText} />
				<Text value={copyrightText} />
			</div>
		</div>
	);
};

export default Footer;
