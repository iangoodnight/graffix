import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      if (
        account.provider === 'google' &&
        profile.verified_email === true &&
        profile.email.endsWith('@bulkapothecary.com')
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
    redirect: async (url) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/');
      }
      return Promise.resolve('/api/auth/signin');
    },
  },
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60 /* one week */,
  },
  database: process.env.MONGODB_URI,
};

export default (req, res) => NextAuth(req, res, options);
