import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
    async encode(data: any) {
      const { secret, token, user } = data;
      const jwtClaims = {
        sub: token.sub,
        name: token.name,
      };

      const encodedToken = jwt.sign(jwtClaims, secret, {
        expiresIn: "60 days",
        algorithm: "HS512",
      });
      return encodedToken;
    },
    async decode(data: any) {
      const { secret, token, maxAge } = data;
      const verify = jwt.verify(token, secret) as JWT;

      return verify;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const { email, password } = credentials;
        return await fetch("localhost:2000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res: any) => {
            const { _id, email, firstName, lastName, isAdmin } = res.data;
            return {
              _id,
              email,
              firstName,
              lastName,
              isAdmin,
            } as any;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
};
export default NextAuth(authOptions);
