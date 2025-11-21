import type { CellContext } from "@tanstack/react-table";
import Button from "@/src/components/Shared/Button/Button";
import Icon from "@/src/components/Shared/Icon/Icon";
import type { ReportRowData } from "@/src/components/Shared/Table/types";
import Text from "@/src/components/Shared/Text/Text";

export const getDownloadCellContent = (
	row: CellContext<ReportRowData, unknown>,
) => {
	const handleDownload = () => {
		// TO-DO
	};

	return (
		<div className="flex justify-center items- center cursor:pointer">
			<Button onClick={handleDownload}>
				<Icon name="download" style={{ opacity: 0.5 }} />
				<Text value="Download" />
			</Button>
			;
		</div>
	);
};
