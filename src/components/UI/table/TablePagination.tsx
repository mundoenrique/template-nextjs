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
import {
	Box,
	Checkbox,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from '@mui/material';

//Internal App
import ActionOptions from './ActionOptions';
import PaginationActions from './ActionPagination';
import { DataTable, RowTable, ColumnTable } from '@/interfaces';

const PaginationTable = ({
	columns,
	data,
	actionOptions,
	rowPages,
	isByService,
	isCheckbox,
	isUniqueSelection,
	isSearch,
	totalRows,
	page,
	loading,
	handleChangePage,
	onAction,
	toggleRows,
}: DataTable) => {
	//Estado global
	const [dataResult, setDataResult] = useState<RowTable[]>(data);
	const [totalRowsGlobal, setTotalRowsGlobal] = useState<number>(totalRows);

	//Estado de busqueda
	const [dataSearch, setDataSearch] = useState<RowTable[]>(data);

	//Verificar la opcion
	const verify_option = (options: string[], field: string) => {
		return options?.includes(field) ? true : false;
	};

	//Ejecutar la accion de la opcion
	const onFunction = (row: RowTable, action: number) => {
		onAction(row, action);
	};

	const [localPage, setLocalPage] = useState<number>(0);
	const [countColumns, setCountColumns] = useState<number>(0);

	//Agregar una columna si viene con opciones
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

	//Multiselect
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const toggleRow = (id: number) => {
		const selectedIndex = selectedRows.indexOf(id);
		let newSelected = isUniqueSelection ? [id] : [...selectedRows];

		if (selectedIndex === -1) {
			newSelected.push(id);
		} else {
			newSelected.splice(selectedIndex, 1);
		}

		if (isUniqueSelection) {
			const unique = removeDuplicates(newSelected);
			setSelectedRows(unique);
		} else {
			setSelectedRows(newSelected);
		}
	};

	const removeDuplicates = (arr: number[]) => [...new Set(arr)];

	const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

	useEffect(() => {
		toggleRows(selectedRows);
	}, [selectedRows]);

	//La data de la tabla
	const rowsTable = useMemo(() => {
		getColumns();
		if (isByService) {
			setLocalPage(page);
			return data;
		} else {
			const rows = dataSearch.slice(
				rowPages * (localPage + 1) - rowPages,
				rowPages * (localPage + 1)
			);

			return rows;
		}
	}, [data, localPage, dataSearch, dataResult]);

	//Search
	const [searchTerm, setSearchTerm] = useState<string>('');

	const filterDataSearch = (text: string) => {
		const data = dataResult.filter((row: RowTable) => {
			const columnsFilter = columns.map((item) => item.id);
			for (const key in row) {
				if (
					row[key].toString().toLowerCase().includes(text.toLowerCase()) &&
					columnsFilter.includes(key)
				) {
					return true;
				}
			}
			return false;
		});

		setTotalRowsGlobal(data.length);
		setDataSearch(data);
	};

	const changeSearchTerm = (value: string) => {
		setSearchTerm(value);
		if (searchTerm.length === 0) {
			setDataSearch(dataResult);
			setLocalPage(0);
		} else {
			filterDataSearch(value);
		}
	};

	return (
		<>
			{isSearch && !isByService && (
				<Grid item xs={12}>
					<Box sx={{ width: '100%', textAlign: 'right', marginBottom: 1 }}>
						<TextField
							label="Search"
							variant="outlined"
							size="small"
							onChange={(e) => changeSearchTerm(e.target.value)}
							value={searchTerm}
						/>
					</Box>
				</Grid>
			)}
			<TableContainer component={Paper} sx={{ position: 'relative' }}>
				{loading && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							background: 'rgba(255, 255, 255, 0.8)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: 999,
						}}
					>
						<CircularProgress color="primary" />
					</div>
				)}

				<Table aria-label="pagination table">
					<TableHead>
						<TableRow>
							{isCheckbox && !isUniqueSelection && (
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
							{isCheckbox && isUniqueSelection && (
								<TableCell padding="checkbox"></TableCell>
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
					{totalRowsGlobal > 10 && (
						<TableFooter>
							<TableRow>
								<TablePagination
									count={totalRowsGlobal}
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
		</>
	);
};

export default PaginationTable;
