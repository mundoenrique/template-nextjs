import connectApi from '@/services/connectApi'

export function getImages(tenant: string, file: string) {
  let validateImage;

  try {
    validateImage = require(`%/images/${tenant}/${file}`);
  } catch (e) {
    validateImage = require(`%/images/novo/${file}`);
  }

  return validateImage;
}

export function log_message(type:string, msg: string) {

	const data = { type, msg }
	connectApi.post('/logger', data)
}

export function validateTenant(tenant:string) {
	const access_url = process.env.NEXT_PUBLIC_ACCESS_URL;
	const validTenants = access_url?.split(',');

	let viewTenant

	if (validTenants?.includes(tenant)) {
		viewTenant = tenant
	} else {
		viewTenant = 'novo'
	}

	return viewTenant
}

export function ramdomData(length:number, format:string = 'alpha'): string | number {
	let result: string | number = '';
	let characters = (format == 'alpha') ? 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789' : '0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	result = (format == 'alpha') ? result : parseInt(result)
	return result;
}
