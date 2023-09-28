'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Typography,
	Grid,
	Button,
	Stack,
	CircularProgress,
} from '@mui/material';
//Internal App
import { log_message, requestGet } from '@/utils';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validation/validationConfig';

//Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import {
	InputDatePicker,
	InputPass,
	InputSelect,
	InputText,
	NavBar,
	InputRadio,
	InputCheck,
	Modals,
	TimmerSession,
	Table,
} from '@/components/UI';
import connectApi from '@/services/connectApi';
import { set } from 'date-fns';

export default function Signin({ params }: any) {
	log_message('info', 'Access the Components page');
	const [showModal, setShowModal] = useState(false);
	const [showModal200, setShowModal200] = useState(false);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('');
	const [formData, setFormData] = useState<any>({});
	const { t } = useTranslation();
	const schema = getSchema(
		['email', 'password', 'programs', 'initialDate', 'roles', 'term'],
		params.tenant
	);

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			email: '',
			password: '',
			programs: '',
			initialDate: '',
			roles: '',
			term: '',
		},
		resolver: yupResolver(schema),
	});

	const servicePost = async () => {
		setLoading(true);
		setResult('');
		const { payload }: any = await connectApi.post('/connectService', {
			url: 'movements',
			data: {
				cardId: 3,
				amount: 185000,
				date: '2022-09-17',
				description: 'Pay service...',
				type: 'D',
			},
		});

		setLoading(false);
		setResult(payload);
		setLoading(false);
	};

	const serviceGet = async () => {
		setLoading(true);
		setResult('');
		const { payload } = await requestGet('cards/4/movements?_limit=10&_page=1');
		setResult(payload);
		setLoading(false);
	};

	const selectOptions = [
		{
			value: '1',
			text: 'option 1',
		},
		{
			value: '2',
			text: 'option 2',
		},
	];

	const RadioOptions = [
		{
			text: t('form.roles_admin_label'),
			value: 'A',
		},
		{
			text: t('form.roles_operator_label'),
			value: 'O',
		},
	];

	const onSubmit = async (data: any) => {
		data.initialDate = dayjs(data.initialDate).format('DD/MM/YYYY');
		setFormData(data);
		setShowModal(true);
	};

	// Table
	const columns = [
		{ id: 'description', label: 'Description' },
		{ id: 'date', label: 'Date' },
		{ id: 'amount', label: 'Amount' },
	];

	const handleChangePage = async (newPage: number) => {
		setPage(newPage);
	};

	const actionOptions = [
		{
			field: 'edit',
			label: 'Editar',
			icon: <EditIcon />,
			action: 2,
		},
		{
			field: 'delete',
			label: 'Eliminar',
			icon: <DeleteIcon />,
			action: 1,
		},
		{
			field: 'create',
			label: 'Crear',
			action: 3,
			icon: <AddIcon />,
		},
	];

	const [movements, setMovements] = useState([]);
	const [page, setPage] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [totalRows, setTotalRows] = useState<number>(0);

	const serviceGetMovements = async () => {
		const { payload } = await requestGet('cards/4/movements');
		setTotalRows(payload.data.length);
	};

	const serviceGetMovementsPagination = async () => {
		setLoading(true);
		setMovements([]);
		await serviceGetMovements();
		const { payload } = await requestGet(
			`cards/4/movements?_limit=${limit}&_page=${page + 1}`
		);
		const { data } = payload;
		setMovements(data);
		setLoading(false);
	};

	useEffect(() => {
		serviceGetMovementsPagination();
	}, [page]);

	return (
		<>
			<TimmerSession tenant={params.tenant} />
			<NavBar />

			<Box sx={{ m: 5 }} component="form" onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h3" sx={{ mb: 3 }}>
					Componentes
				</Typography>
				<Grid container columns={3} spacing={2}>
					<Grid
						item
						xs={2}
						sx={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<Button variant="text">Variant `Text`</Button>
						<Button variant="outlined">Variant `Outlined`</Button>
						<Button variant="contained">Variant `Contained`</Button>
					</Grid>
					<Grid item xs={2}>
						<InputText name="email" control={control} optional />
						<InputPass name="password" control={control} additionalInfo />
						<InputSelect
							name="programs"
							control={control}
							options={selectOptions}
						/>
						<InputDatePicker name="initialDate" control={control} />
						<InputRadio
							name="roles"
							control={control}
							label="Seleciona el tipo de usuario"
							options={RadioOptions}
						/>
						<InputCheck
							name="term"
							control={control}
							label="Seleciona el tipo de usuario"
						/>
					</Grid>
					<Grid item xs={1}>
						<Box sx={{ m: 'auto', maxWidth: 700, width: '100%' }}>
							<Button variant="contained" type="submit" fullWidth>
								{t('buttons.accept')}
							</Button>
						</Box>
					</Grid>
					<Grid item xs={1}>
						<Typography variant="h3" sx={{ mb: 3 }}>
							Peticiones a servicios
						</Typography>

						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								onClick={() => servicePost()}
								disabled={loading}
								fullWidth
							>
								{loading && <CircularProgress color="secondary" size={20} />}
								{!loading && 'Post'}
							</Button>

							<Button
								variant="contained"
								onClick={() => serviceGet()}
								disabled={loading}
								fullWidth
							>
								{loading && <CircularProgress color="secondary" size={20} />}
								{!loading && 'Get'}
							</Button>
						</Stack>
						<Box sx={{ mt: 2 }}>
							<code>{JSON.stringify(result, null, 2)}</code>
						</Box>
					</Grid>
				</Grid>
				<Grid container columns={3} spacing={2}>
					<Grid item xs={1}>
						<Typography variant="h3" sx={{ mb: 3 }}>
							Table
						</Typography>
						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								onClick={() => serviceGetMovementsPagination()}
								disabled={loading}
								fullWidth
							>
								{loading && <CircularProgress color="secondary" size={20} />}
								{!loading && 'Movimientos'}
							</Button>
						</Stack>
					</Grid>
					<Grid item xs={3}>
						{movements.length > 0 && (
							<Table
								data={movements}
								columns={columns}
								actionOptions={actionOptions}
								rowPages={limit}
								page={page}
								isByService={true}
								totalRows={totalRows}
								handleChangePage={handleChangePage}
							/>
						)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
