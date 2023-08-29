import { authenticate } from "@/services/authService"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt";

import { signToken, validToken } from "./jwt";

export const options: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" },
      },
			async authorize(credentials, req): Promise<any> {

				const response = await authenticate(credentials!.email, credentials!.password, req)

        if (response.code === 0) {
          return {...response.user, ip: response.ipAddress}
        } else {
          throw new Error(JSON.stringify({ errors: 'Error en crdenciales', status: false, code: 1 }))
        }
      }
    })
	],
	session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
		maxAge: 60 * 60 * 24,
		encode: async ({ token }) => {
    const encodedToken = await signToken(token)
    return encodedToken
  },
		decode: async ({ token }) => {
    const verify = await validToken(token)
    return verify as JWT
  },
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: process.env.NODE_ENV != 'production' ? "Lax" : "Strict",
				path: '/',
				secure: true
			}
		},
		csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV != 'production' ? "Lax" : "Strict",
        path: "/",
        secure: true,
      },
    }
	},
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
      	token.ip = user.ip
    	}
			return token
		}
	}
};
