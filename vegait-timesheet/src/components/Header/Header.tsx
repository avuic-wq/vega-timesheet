"use server";

import Text from "@/src/components/Text/Text";
import ActionButton from "./ActionButton";
import { config as headerConfig } from "./config";
import Search from "./Search";

const staticStyles = "flex bg-white rounded-[16px] p-6 gap-2";

interface Props {
	setting: string;
}

const Header = ({ setting }: Props) => {
	// TO-DO: Might be a wrapper because of filters/etc
	const config = headerConfig[setting] || {};
	const { title, description, hasActionButton, hasSearch } = config;

	const dynamicStyles = `${hasSearch ? "justify-center" : "justify-left"}`;

	return (
		<div className={`${staticStyles} ${dynamicStyles}`}>
			<div className="basis-[45%] flex flex-col gap-6">
				<Text value={title} className="font-bold heading-lg" />
				<Text value={description} className="text-lg" />
				{hasActionButton && <ActionButton setting={setting} />}
			</div>

			{hasSearch && (
				<div className="basis-[55%] flex justify-end items-center">
					<div className="basis-[60%] h-fit">
						<Search />
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
