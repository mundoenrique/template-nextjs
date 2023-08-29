import React, { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Internal App
import ActionOptions from './ActionOptions';
import { SvgIconProps } from '@mui/material';

interface Column {
	id: string;
	label: string;
}

interface Data {
	id: number;
	description: string;
	date: string;
	amount: number;
	options?: string[];
}

interface Row {
	id: number;
	[key: string]: any;
}

interface ActionOption {
	field: string;
	label: string;
	icon: React.ReactElement<SvgIconProps>;
	action: number;
}

interface Props {
	columns: Column[];
	data: Data[];
	actionOptions?: ActionOption[];
}

const PaginationTable: React.FC<Props> = ({ data, columns, actionOptions }) => {
	const verify_option = (options: string[], field: string) => {
		return options?.includes(field) ? true : false;
	};

	const onModal = (row: Row) => {
		console.log('Abrir modal', row);
	};

	const onRedirect = (row: Row) => {
		console.log('Redireccionar', row);
	};

	const onFunction = (row: Row) => {
		console.log('Ejecutar funcion', row);
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label="pagination table">
				<TableHead>
					<TableRow>
						{columns.map((column: Column) => (
							<TableCell key={column.id}>{column.label}</TableCell>
						))}
						{actionOptions ? (
							<TableCell align="center">Opciones</TableCell>
						) : null}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row: Row) => (
						<TableRow key={row.id}>
							{columns.map((column: Column) => (
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
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PaginationTable;
