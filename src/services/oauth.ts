import axios from 'axios';
const Logger = require("@/utils/logger");

interface Oauth {
	data: Data,
	status: number,
	code: number,
}

interface Data{
	accesToken: string
	refreshToken: string
}

export function accessToken() {
  return new Promise<Oauth>(function (resolve, reject) {
    var route = process.env.URL_OAUTH
    var grantType = process.env.GRANT_TYPE
    var clientId = process.env.CLIENT_ID
    var secret = process.env.CLIENT_SECRET
    var args = {
      headers: {
        'Content-Type': 'application/json',
        'x-language': 'En',
        'x-channel': 'Us'
      },
      data: {'grant_type': grantType,
      'client_id':clientId,
      'client_secret': secret
      }
    }

    axios({
        method: 'POST',
        url: route,
        responseType: 'json',
        headers: args.headers,
        data: args.data
		}).then(function (responseBody) {
        Logger.info(`Obtiene data Oauth ${JSON.stringify(responseBody.data)}`)
        resolve({
          data: responseBody.data,
					status: 200,
					code: 0
        })
      })
      .catch(error => {
        Logger.error(`Error al obtener Oauth ${JSON.stringify(error)}`)
        resolve({
          data: error,
          status: 200,
          code: 1
        })
      })
  })
}

export function refreshToken(refreshTok:string) {
  return new Promise(function (resolve, reject) {
    var route = process.env.URL_REFRESH
    var args = {
      headers: {
        'x-language': 'eng',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'channel': 'web',
        'accept': 'application/json',
        'x-channel': 'api'
      },
      data: 'refresh_token=' + refreshTok
    }
  })
}
