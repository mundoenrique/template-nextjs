import jwt from 'jsonwebtoken'

interface User{
  id: string
  name: string
  email:string
}

export const signToken = (id: string, name:string, email: string) => {

	if( !process.env.JWT_SECRET) {
		throw new Error("No hay KEY JWT")
	}

	return jwt.sign(
		{id, email, name},
		process.env.JWT_SECRET,
		{ expiresIn: '1d'}
	)

}

export const isValidToken = (token: string):Promise<User> => {

	if( !process.env.JWT_SECRET) {
		throw new Error("No hay KEY de JWT")
	}

	if ( token.length < 10 ){
		return Promise.reject('JWT No es valido')
	}

	return new Promise((resolve, reject) => {

		try {
			jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) =>{
				if ( err ) return reject('JWT no es valido')

				const { id, name, email } = payload as { id: string, name: string, email:string}

				resolve({id, name, email})
			})
		} catch (error) {

		}
	})
}
