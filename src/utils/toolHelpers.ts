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

export function log_message(type: string, msg: string, action: string = 'axios') {
  const data = { type, msg };
  action === 'axios'
    ? connectApi.post('/logger', data)
    : fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/logger`, {
        method: 'POST',
        body: JSON.stringify({ payload: encrypt(JSON.stringify(data)) }),
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

export function ramdomData(length: number, format: string = 'alpha'): string | number {
  let result: string | number = '';
  let characters = format == 'alpha' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyzZ0123456789' : '0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result = format == 'alpha' ? result : parseInt(result);
  return result;
}

export const encrypt = (data: any, secret: string = process.env.NEXT_PUBLIC_SECRET_KEY || '') => {
  const key = CryptoJS.enc.Base64.parse(secret);
  const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
  var ciphertext = CryptoJS.AES.encrypt(data, key, { iv });
  return ciphertext.toString();
};

export const decrypt = (crypted: any, secret: string = process.env.NEXT_PUBLIC_SECRET_KEY || '') => {
  const key = CryptoJS.enc.Base64.parse(secret);
  const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_IV || '');
  var bytes = CryptoJS.AES.decrypt(crypted, key, { iv });
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export const encryptToView = (data: any) => {
  try {
    const decode = ramdomData(22).toString();
    const encryptData = encrypt(JSON.stringify(data), decode);
    const encryptResponse = {
      payload: encryptData,
      code: decode,
    };
    return encryptResponse;
  } catch (e) {
    log_message('error', `Error encrypt to view ${e}`);
  }
}

export const requestGet = async (data: any) => {

	const params = encrypt(data)

	const response: any = await connectApi.get('/connectService', {
			params: {
				url: params
			}
	})

	return response
}
