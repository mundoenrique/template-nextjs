'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';

//Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

//Internal App
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validationConfig';
import {
	InputDatePicker,
	InputPass,
	InputSelect,
	InputText,
	NavBar,
	InputRadio,
	InputCheck,
	Modals,
} from '@/components/UI';
import { useEffect, useState } from 'react';
import TablePagination from '@/components/UI/table/TablePagination';
import { Movements } from '@/interfaces';

export default function Signin({ params }: any) {
	const [showModal, setShowModal] = useState(false);
	const [showModal200, setShowModal200] = useState(true);
	const [formData, setFormData] = useState<any>({});
	const { lang } = useLangStore();
	const { t } = useTranslation(lang, `${params.tenant}-general`);
	const schema = getSchema([
		'email',
		'password',
		'programs',
		'initialDate',
		'roles',
		'term',
	]);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
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

	const infoTable = [
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 1 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 8,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 2 service Disney Plus',
			type: 'D',
			id: 9,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 3 service Disney Plus',
			type: 'D',
			id: 10,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 4 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete', 'create'],
			id: 11,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 5 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete'],
			id: 12,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 6 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete'],
			id: 13,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 7 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 14,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 8 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 15,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 9 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 16,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 10 service Disney Plus',
			type: 'D',
			id: 17,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 11 service Disney Plus',
			type: 'D',
			id: 18,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 12 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete', 'create'],
			id: 19,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 13 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete'],
			id: 20,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 14 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete'],
			id: 21,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 15 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 22,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 16 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 23,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 17 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 24,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 18 service Disney Plus',
			type: 'D',
			id: 25,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 19 service Disney Plus',
			type: 'D',
			id: 26,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 20 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete', 'create'],
			id: 27,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 21 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete'],
			id: 28,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 22 service Disney Plus',
			type: 'D',
			options: ['edit', 'delete'],
			id: 29,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 23 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 30,
		},
		{
			cardId: 4,
			amount: 185000,
			date: '2022-09-17',
			description: 'Pay 24 service Disney Plus',
			type: 'D',
			options: ['edit'],
			id: 31,
		},
	];

	// const defaulValues = {
	// 	data: [],
	// 	page: 0,
	// 	total: 0,
	// };

	// const [dataMovement, setMovementState] = useState<Movements>(defaulValues);

	// const getData = async (page: number): Promise<Movements> => {
	// 	const response = await axios.get(
	// 		`https://api-services-kfmf.onrender.com/cards/${4}/movements?_limit=10&_page=${
	// 			page + 1
	// 		}`
	// 	);
	// 	const res = await axios.get(
	// 		`https://api-services-kfmf.onrender.com/cards/${4}/movements`
	// 	);

	// 	const data = response.data.data.map((item: any) => {
	// 		return {
	// 			description: item.description,
	// 			date: item.date,
	// 			amount: item.amount,
	// 		};
	// 	});
	// 	const total = res.data.data.length;

	// 	return { data, page, total };
	// };

	const handleChangePage = async (newPage: number) => {
		console.log('Llamar al servicio, en la pagina:', newPage + 1);

		// 	await getData(newPage).then((data) => setMovementState(data));
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

	return (
		<>
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
						<InputText
							name="email"
							control={control}
							tenant={params.tenant}
							optional
						/>
						<InputPass
							name="password"
							control={control}
							tenant={params.tenant}
							additionalInfo
						/>
						<InputSelect
							name="programs"
							control={control}
							tenant={params.tenant}
							options={selectOptions}
						/>
						<InputDatePicker
							name="initialDate"
							control={control}
							tenant={params.tenant}
						/>
						<InputRadio
							name="roles"
							control={control}
							label="Seleciona el tipo de usuario"
							tenant={params.tenant}
							options={RadioOptions}
						/>
						<InputCheck
							name="term"
							control={control}
							label="Seleciona el tipo de usuario"
							tenant={params.tenant}
						/>
					</Grid>
					<Grid item xs={1}>
						<Box sx={{ m: 'auto', maxWidth: 700, width: '100%' }}>
							<Button variant="contained" type="submit" fullWidth>
								{t('buttons.accept')}
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>

			<Modals
				msgModal={
					<>
						<Typography>
							{t('dataForm.email', { email: formData.email })}
						</Typography>
						<Typography>
							{t('dataForm.password', { password: formData.password })}
						</Typography>
						<Typography>
							{t('dataForm.programs', { programs: formData.programs })}
						</Typography>
						<Typography>
							{t('dataForm.initialDate', { initialDate: formData.initialDate })}
						</Typography>
						<Typography>
							{t('dataForm.roles', { roles: formData.roles })}
						</Typography>
					</>
				}
				buttons={2}
				showModal={showModal}
			>
				<Button variant="text" onClick={() => setShowModal(false)}>
					{t('buttons.cancel')}
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						setShowModal(false);
						setShowModal200(true);
						reset();
					}}
				>
					{t('buttons.accept')}
				</Button>
			</Modals>

			<Modals msgModal="Formulario enviado" showModal={showModal200}>
				<Button variant="contained" onClick={() => setShowModal200(false)}>
					{t('buttons.accept')}
				</Button>
			</Modals>

			<TablePagination
				data={infoTable}
				columns={columns}
				actionOptions={actionOptions}
				rowPages={10}
				isByService={true}
				handleChangePage={handleChangePage}
			/>
		</>
	);
}
