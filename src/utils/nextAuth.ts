import { authenticate } from "@/services/authService"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
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
