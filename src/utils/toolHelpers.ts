import connectApi from '@/services/connectApi';
import { signOut } from "next-auth/react"
import Cookies from 'js-cookie'

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
