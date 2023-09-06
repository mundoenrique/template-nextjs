import { SvgIconProps } from '@mui/material';

export interface DataTable {
	columns: ColumnTable[];
	data: InfoRow[];
	actionOptions?: ActionOption[];
	rowPages: number;
	isByService?: boolean;
	handleChangePage: (newPage: number) => void;
}

export interface Movements {
	data: InfoRow[];
	page: number;
	total: number;
}

export interface ColumnTable {
	id: string;
	label: string;
}

export interface InfoRow {
	id: number;
	description: string;
	date: string;
	amount: number;
	options?: string[];
}

export interface RowTable {
	id: number;
	[key: string]: any;
}

export interface ActionOption {
	field: string;
	label: string;
	icon: React.ReactElement<SvgIconProps>;
	action: number;
}

export interface IPaginationActions {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (newPage: number) => void;
}
