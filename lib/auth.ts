import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import client from '../app/services/client';

interface Credentials {
  token: string;
  email: string;
  username: string;
  password: string;
  URL: string;
  LoginURL: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 86400 * 2,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        token: { label: 'Token', type: 'text' },
        email: { label: 'Email', type: 'text' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        URL: { label: 'URL', type: 'text' },
        LoginURL: { label: 'Login URL', type: 'text' },
      },
      async authorize(credentials) {
        // Check if credentials are defined
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        try {
          const { token, email, username, password, URL, LoginURL } =
            credentials as Credentials;

          let user = null;

          if (token) {
            const response = await client.get(URL, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response?.data?.status_code === 200) {
              user = response?.data?.data;
            } else {
              throw new Error('Invalid token');
            }
          } else {
            const response = await client.post(LoginURL, {
              login: email || username,
              email,
              username,
              password,
            });

            if (response?.data?.status_code === 200) {
              user = response?.data?.data;
            } else {
              throw new Error('Invalid credentials');
            }
          }

          return user;
        } catch (error: any) {
          console.error('Authentication error:', error.message);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
