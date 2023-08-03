import { AnySchema } from 'yup';

export type Field = string | { [key: string]: string[] };

export type ValidationRule = { [key: string]: AnySchema };

export type ValidationShape = { [key: string]: AnySchema };
