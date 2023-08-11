export function getImages(tenant: string, file: string) {
  let validateImage;

  try {
    validateImage = require(`%/images/${tenant}/${file}`);
  } catch (e) {
    validateImage = require(`%/images/novo/${file}`);
  }

  return validateImage;
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
