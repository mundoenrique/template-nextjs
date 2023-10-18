import React, { useState, useEffect, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Typography } from '@mui/material';

//Internal App
import ActionOptions from './ActionOptions';
import PaginationActions from './ActionPagination';
import {
	DataTable,
	RowTable,
	ColumnTable,
	ActionOption,
	InfoRow,
} from '@/interfaces';
import { set } from 'date-fns';

const PaginationTable = ({
	columns,
	data,
	actionOptions,
	rowPages,
	isByService,
	isCheckbox,
	totalRows,
	page,
	handleChangePage,
	onAction,
	toggleRows,
}: DataTable) => {
	const verify_option = (options: string[], field: string) => {
		return options?.includes(field) ? true : false;
	};

	const onFunction = (row: RowTable, action: number) => {
		onAction(row, action);
	};

	const [localPage, setLocalPage] = useState<number>(0);
	const [countColumns, setCountColumns] = useState<number>(0);

	const getColumns = () => {
		if (actionOptions) {
			setCountColumns(columns.length + 1);
		} else {
			setCountColumns(columns.length);
		}
	};

	const changePaged = (event: unknown, newPage: number) => {
		if (isByService) {
			handleChangePage(newPage);
		} else {
			setLocalPage(newPage);
		}
	};

	const rowsTable = useMemo(() => {
		getColumns();
		if (isByService) {
			setLocalPage(page);
			return data;
		} else {
			const copy = [...data];
			const rows = copy.slice(
				rowPages * (localPage + 1) - rowPages,
				rowPages * (localPage + 1)
			);
			return rows;
		}
	}, [data, localPage]);

	//SELECTED ROWS
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const toggleRow = (id: number) => {
		const selectedIndex = selectedRows.indexOf(id);
		let newSelected = [...selectedRows];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(id);
		} else {
			newSelected.splice(selectedIndex, 1);
		}
		setSelectedRows(newSelected);
	};
	const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

	useEffect(() => {
		toggleRows(selectedRows);
	}, [selectedRows]);

	//END SELECTED ROWS
	return (
		<TableContainer component={Paper}>
			<Table aria-label="pagination table">
				<TableHead>
					<TableRow>
						{isCheckbox && (
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={
										selectedRows.length > 0 &&
										selectedRows.length < rowsTable.length
									}
									checked={selectedRows.length === rowsTable.length}
									onChange={() => {
										if (selectedRows.length === rowsTable.length) {
											setSelectedRows([]);
										} else {
											setSelectedRows(rowsTable.map((item) => item.id));
										}
									}}
								/>
							</TableCell>
						)}
						{columns.map((column: ColumnTable) => (
							<TableCell key={column.id}>{column.label}</TableCell>
						))}
						{actionOptions ? (
							<TableCell align="center">Opciones</TableCell>
						) : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{rowsTable.map((row: RowTable) => {
						const isItemSelected = isSelected(row.id);
						return (
							<TableRow
								key={row.id}
								selected={isItemSelected}
								onClick={() => toggleRow(row.id)}
							>
								{isCheckbox && (
									<TableCell padding="checkbox">
										<Checkbox checked={isItemSelected} />
									</TableCell>
								)}
								{columns.map((column: ColumnTable) => (
									<TableCell key={column.id}>{row[column.id]}</TableCell>
								))}

								{actionOptions ? (
									<TableCell align="center">
										{actionOptions.map((option, index) =>
											verify_option(row?.options, option.field) ? (
												<ActionOptions
													field={option.field}
													key={index}
													label={option.label}
													icon={option.icon}
													action={option.action}
													onAction={() => onFunction(row, option.action)}
												/>
											) : null
										)}
									</TableCell>
								) : null}
							</TableRow>
						);
					})}
					{rowsTable.length === 0 && (
						<TableRow>
							<TableCell colSpan={countColumns}>
								<Typography
									variant="h5"
									color="custom.tertiary"
									style={{ textAlign: 'center' }}
								>
									No data available
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				{rowsTable.length !== 0 && (
					<TableFooter>
						<TableRow>
							<TablePagination
								count={totalRows}
								page={localPage}
								rowsPerPage={rowPages}
								onPageChange={changePaged}
								ActionsComponent={PaginationActions}
								rowsPerPageOptions={[]}
							/>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</TableContainer>
	);
};

export default PaginationTable;
