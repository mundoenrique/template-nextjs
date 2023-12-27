import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';
import { authenticate } from '@/services/authService';
import CredentialsProvider from 'next-auth/providers/credentials';
//Internal app
import { signToken, validToken } from './jwt';
interface User {
  id: number;
  name: string;
  email: string;
  ip?: string;
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
				const response = await authenticate(credentials!.email, credentials!.password, req.headers);

        if (response.code === 0) {
          return { ...response.user, ip: response.ipAddress };
				} else {
          throw new Error(JSON.stringify({ errors: 'Error en credenciales', status: false, code: 1 }));
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: parseInt(process.env.NEXTAUTH_EXPIRE || '300') + 5  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: parseInt(process.env.NEXTAUTH_EXPIRE || '300') + 5,
    encode: async ({ token }) => {
      const encodedToken = await signToken(token);
      return encodedToken;
    },
    decode: async ({ token }) => {
      const verify = await validToken(token);
      return verify as JWT;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV != 'production' ? 'lax' : 'strict',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV != 'production' ? 'lax' : 'strict',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
		async jwt({ token, user }: any) {
      if (user) {
        token.ip = user.ip;
      }
      return token;
    },
  },
};
