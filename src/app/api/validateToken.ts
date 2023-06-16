import type { NextApiRequest, NextApiResponse } from 'next'
import { signToken, isValidToken } from '../../utils/jwt'

type Data =
 |	{ code: number,	message: string }
 |	{
	 		token: string
			user: {
				id: string
				name: string
				email: string
			}
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	switch (req.method) {
		case 'GET':
			return validateJWT(req, res)

		default:
			return res.status(400).json({ code: 1, message: 'Band request' })
	}
}

const validateJWT = async(req: NextApiRequest, res: NextApiResponse) => {

  const { token = '' } = req.cookies;

  try {
    const response: any = await isValidToken(token);

    const { id, name, email } = response;
    return res.status(200).json({
      token: signToken(id, name, email),
      user: {
        id,
        name,
        email,
      },
    });
  } catch (error) {
    return res.status(401).json({ code: 1, msg: 'Token de autorización inválido',
    });
  }
}
