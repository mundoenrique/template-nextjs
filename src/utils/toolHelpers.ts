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

export function log_message(msg: string, user:string = '', action:string = 'axios'){

 const data = { msg, user }

 action === 'axios' 
 ? connectApi.post('/logger', data)
 : fetch(process.env.NEXT_PUBLIC_PATH_URL +'/api/logger', {
   method: "POST",
   body: JSON.stringify(data)
   })
}