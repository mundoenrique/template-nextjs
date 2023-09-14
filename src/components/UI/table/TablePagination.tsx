import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

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

const PaginationTable = ({
	columns,
	data,
	actionOptions,
	rowPages,
	isByService,
	handleChangePage,
}: DataTable) => {
	const verify_option = (options: string[], field: string) => {
		return options?.includes(field) ? true : false;
	};

	const onModal = (row: RowTable) => {
		console.log('Abrir modal', row);
	};

	const onRedirect = (row: RowTable) => {
		console.log('Redireccionar', row);
	};

	const onFunction = (row: RowTable) => {
		console.log('Ejecutar funcion', row);
	};

	const totalRows = data.length;

	const [page, setPage] = useState<number>(0);
	const [dataTable, setDataTable] = useState<InfoRow[]>([]);
	const [countColumns, setCountColumns] = useState<number>(0);

	const pagedData = () => {
		const copy = [...data];
		const rows = copy.slice(
			rowPages * (page + 1) - rowPages,
			rowPages * (page + 1)
		);
		setDataTable(rows);
	};

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
		}
		setPage(newPage);
	};

	useEffect(() => {
		pagedData();
		getColumns();
	}, [page]);

	return (
		<TableContainer component={Paper}>
			<Table aria-label="pagination table">
				<TableHead>
					<TableRow>
						{columns.map((column: ColumnTable) => (
							<TableCell key={column.id}>{column.label}</TableCell>
						))}
						{actionOptions ? (
							<TableCell align="center">Opciones</TableCell>
						) : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataTable.map((row: RowTable) => (
						<TableRow key={row.id}>
							{columns.map((column: ColumnTable) => (
								<TableCell key={column.id}>{row[column.id]}</TableCell>
							))}
							{actionOptions ? (
								<TableCell align="center">
									{actionOptions.map((option: ActionOption, index) =>
										verify_option(row?.options, option.field) ? (
											<ActionOptions
												field={option.field}
												key={index}
												label={option.label}
												icon={option.icon}
												action={option.action}
												onFunction={() => onFunction(row)}
												onRedirect={() => onRedirect(row)}
												onModal={() => onModal(row)}
											/>
										) : null
									)}
								</TableCell>
							) : null}
						</TableRow>
					))}
					{dataTable.length === 0 && (
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
				{dataTable.length !== 0 && (
					<TableFooter>
						<TableRow>
							<TablePagination
								count={totalRows}
								page={page}
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
