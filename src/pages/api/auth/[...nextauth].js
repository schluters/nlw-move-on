import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default (req, res) => NextAuth(req, res, {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    // Providers.Credentials({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "email" },
    //     password: {  label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {
    //     const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     if (user) {
    //       return user
    //     } else {
    //       return null
    //     }
    //   }
    // })
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  },
})
