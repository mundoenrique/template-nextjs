import CryptoJS from 'crypto-js';
//Internal app
import connectApi from '@/services/connectApi';

export function getImages(tenant: string, file: string) {
	let validateImage;

	try {
		validateImage = require(`%/images/${tenant}/${file}`);
	} catch (e) {
		validateImage = require(`%/images/novo/${file}`);
	}

	return validateImage;
}

export function log_message(type: string, msg: string) {
	const data = { type, msg };
	fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/logger`, {
		method: 'POST',
		body: JSON.stringify({ payload: encrypt({ data: JSON.stringify(data )}) }),
	});
}

export function validateTenant(tenant: string) {
	const access_url = process.env.NEXT_PUBLIC_ACCESS_URL;
	const validTenants = access_url?.split(',');

	let viewTenant;

	if (validTenants?.includes(tenant)) {
		viewTenant = tenant;
	} else {
		viewTenant = 'novo';
	}

	return viewTenant;
}

export function ramdomData(
	length: number,
	format: string = 'alpha'
): string | number {
	let result: string | number = '';
	let characters =
		format == 'alpha'
			? 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789'
			: '0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	result = format == 'alpha' ? result : parseInt(result);
	return result;
}

export const encrypt = ({
	data,
  secret = process.env.NEXT_PUBLIC_SECRET_KEY || '',
  safety = process.env.NEXT_PUBLIC_ACTIVE_SAFETY
} : any & string
) => {

  if (safety === 'ON') {
    const key = CryptoJS.enc.Base64.parse(secret);
    const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
    var ciphertext = CryptoJS.AES.encrypt(data, key, { iv });
    return ciphertext.toString();
  }

	return data
};

export const decrypt = ({
  data,
  secret = process.env.NEXT_PUBLIC_SECRET_KEY || '',
  safety = process.env.NEXT_PUBLIC_ACTIVE_SAFETY
 } : any & string
) => {
  if (safety === 'ON') {
    const key = CryptoJS.enc.Base64.parse(secret);
    const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
    var bytes = CryptoJS.AES.decrypt(data, key, { iv });
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData
  }
	return data;
};

export const encryptToView = (data: any) => {

  try {
    const decode = ramdomData(22).toString();
    const reqData = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.stringify(data) : data
		const encryptData = encrypt({ data: reqData, secret: decode });
		const encryptResponse = {
			payload: encryptData,
			code: decode,
    };
    const resData = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.stringify(encryptResponse) : encryptResponse
    const response = encrypt({ data: resData});
		return response;
	} catch (e) {
		log_message('error', `Error encrypt to view ${e}`);
	}
};

export const requestGet = async (url: string) => {
	const params = encrypt( {data: url} );

	const response: any = await connectApi.get('/connectService', {
		params: {
			url: params,
		},
	});

	return response;
};
