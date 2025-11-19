"use server";

import type { PropsWithChildren } from "react";
import Text from "@/src/components/Shared/Text/Text";
import ActionButton from "./ActionButton";
import { config as headerConfig } from "./config";
import Search from "./Search";

const wrapperStyles = "flex flex-col bg-white rounded-2xl p-6 gap-10";

interface Props {
	setting: string;
}

const Header: React.FC<PropsWithChildren<PropsWithChildren<Props>>> = ({
	children,
	setting,
}) => {
	const config = headerConfig[setting] || {};
	const { title, description, hasActionButton, hasSearch } = config;

	const mainHeaderStyles = `${hasSearch ? "justify-center" : "justify-left"}`;

	return (
		<div className={wrapperStyles}>
			<div className={`flex ${mainHeaderStyles}`}>
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
			{children}
		</div>
	);
};

export default Header;
