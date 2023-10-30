import { SvgIconProps } from '@mui/material';

export interface DataTable {
	columns: ColumnTable[];
	data: InfoRow[];
	actionOptions?: ActionOption[];
	rowPages: number;
	isByService?: boolean;
	isCheckbox?: boolean;
	isUniqueSelection?: boolean;
	totalRows: number;
	page: number;
	loading?: boolean;
	handleChangePage: (newPage: number) => void;
	onAction: (row: RowTable, action: number) => void;
	toggleRows: (id: number[]) => void;
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
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number
	) => void;
}
