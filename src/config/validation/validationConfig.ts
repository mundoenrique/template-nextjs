import * as yup from 'yup';
//Internal app
import { Field, ValidationRule, ValidationShape } from '@/interfaces';
import { bdb, coop, novo } from '.';

const getValidationTenant: {
	[key: string]: ValidationRule;
} = {
	bdb: bdb,
	coop: coop,
	novo: novo,
};

/**
 * Generates a yup validation schema based on an array of form fields.
 */
export const getSchema = (
	fields: Field[],
	tenant: string
): yup.ObjectSchema<any> => {
	const validationRulesTenant = getValidationTenant[tenant];

	const shape = fields.reduce<ValidationShape>((acc, field) => {
		if (typeof field === 'string') {
			acc[field] = validationRulesTenant[field];
		} else if (typeof field === 'object') {
			const key = Object.keys(field)[0];
			const subFields = field[key];
			acc[key] = yup.array().of(
				yup.object().shape(
					subFields.reduce<ValidationShape>((subAcc, subField) => {
						subAcc[subField] = validationRulesTenant[subField];
						return subAcc;
					}, {})
				)
			);
		}
		return acc;
	}, {});
	return yup.object().shape(shape);
};
