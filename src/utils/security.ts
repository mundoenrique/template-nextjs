import CryptoJS from "crypto-js"
import { connectApi } from "../services/connect";

export const encrypt = (data:any) => {
  const key = CryptoJS.enc.Hex.parse(process.env.SECRET_KEY || '');
  const iv = CryptoJS.enc.Hex.parse(process.env.SECRET_IV || '');
  let crypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
  return crypted.toString()
}

export const decrypt = (crypted:any) => {
  const key = CryptoJS.enc.Hex.parse(process.env.SECRET_KEY || '');
  const iv = CryptoJS.enc.Hex.parse(process.env.SECRET_IV || '');
  let decode = CryptoJS.AES.decrypt(crypted, key, { iv: iv });
  return decode.toString(CryptoJS.enc.Utf8);
}

export const validateIdUser = async (): Promise<string> => {

  if(!localStorage.getItem('session')) return window.location.href = '/'
  const dataStoregeUser = JSON.parse(localStorage.getItem('session') || '')
  if(!dataStoregeUser.id) return window.location.href = '/'
  const { data } = await connectApi.get('/validateToken')
  if(decrypt(dataStoregeUser.id) != data.user.id) return window.location.href = '/'

  return decrypt(dataStoregeUser.id)
}
