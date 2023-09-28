import * as jose from 'jose'

export async function signToken(token: any) {
	const secret = jose.base64url.decode(process.env.NEXTAUTH_SECRET || '')
	const jwt = await new jose.EncryptJWT(token)
  	.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
  	.setIssuedAt()
  	.setIssuer('Services_Financials')
  	.setAudience('NovoPayment_Services')
  	.setExpirationTime('12h')
		.encrypt(secret)

	return jwt
}

export async function validToken(token: any) {

	if(token === undefined) return null

	const secret = jose.base64url.decode(process.env.NEXTAUTH_SECRET || '')
	const { payload } = await jose.jwtDecrypt(token, secret, {
  issuer: 'Services_Financials',
  audience: 'NovoPayment_Services',
	})

	return payload
}
