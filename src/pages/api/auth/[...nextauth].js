import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default (req, res) => NextAuth(req, res, {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})
