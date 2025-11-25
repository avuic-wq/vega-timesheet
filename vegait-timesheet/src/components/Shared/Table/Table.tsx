"use client";

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Button from "@/src/components/Shared/Button/Button";
import Icon from "@/src/components/Shared/Icon/Icon";
import type {
	BaseRowData,
	TableConfig,
} from "@/src/components/Shared/Table/types";
import Text from "@/src/components/Shared/Text/Text";

interface Props<T extends BaseRowData> {
	config: TableConfig;
	rowsData: T[];
}

const Table = <T extends BaseRowData>({ config, rowsData }: Props<T>) => {
	const table = useReactTable({
		data: rowsData,
		columns: config.headers,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 10,
			},
		},
		// TO-DO: sorting, filtering, pagination
	});

	return (
		<div className="w-full bg-white rounded-2xl p-6">
			<table className="w-full">
				<thead>
					<tr className="">
						{table.getHeaderGroups()[0].headers.map((header) => (
							<th
								key={header.id}
								className="text-left text-sm text-black py-3 px-4"
							>
								{flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row, index) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								if (cell.column.id === "download") {
									return (
										<td
											key={cell.id}
											className="text-sm text-gray-500 py-4 px-4"
										>
											<Button variant="custom" className="flex gap-3">
												<Icon name="download" style={{ opacity: 0.5 }} />
												<Text
													value="Download"
													className="flex flex-col justify-end"
												/>
											</Button>
										</td>
									);
								}
								return (
									<td key={cell.id} className="text-sm text-gray-600 py-4 px-4">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
