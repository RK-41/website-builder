import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import client from '../../../services/client';

interface Credentials {
  token: string;
  email: string;
  username: string;
  password: string;
  URL: string;
  LoginURL: string;
}

const handler = NextAuth({
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
      async authorize(
        credentials:
          | Record<
              'email' | 'token' | 'username' | 'password' | 'URL' | 'LoginURL',
              string
            >
          | undefined
      ) {
        try {
          if (!credentials) throw new Error('Credentials are required');
          const { token, email, username, password, URL, LoginURL } =
            credentials;
          let user = null;

          if (token) {
            // Validate token with the backend
            const response = await client.get(URL, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response?.data?.status_code === 200) {
              user = response?.data?.data; // Extract user details
            } else {
              throw new Error('Invalid token');
            }
          } else {
            // Login using email/username & password
            const response = await client.post(LoginURL, {
              login: email || username,
              email,
              username,
              password,
            });

            if (response?.data?.status_code === 200) {
              user = response?.data?.data; // Extract user details
            } else {
              throw new Error('Invalid credentials');
            }
          }

          return user; // Must return user object for session to be created
        } catch (error: any) {
          console.error('Authentication error:', error.message);
          return null; // Return null for failed authentication
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/login', // Custom login page
    signOut: '/auth/logout', // Optional custom sign-out page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Store user details in JWT
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user; // Attach user data to session
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env file
});

export { handler as GET, handler as POST };
