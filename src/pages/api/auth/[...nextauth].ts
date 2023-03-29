import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiReqHandler } from "../../../components";
// const authOptions: NextAuthOptions =
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.TOKEN_SECRET,
  // jwt: {
  //   secret: process.env.TOKEN_SECRET,
  //   async encode(data: any) {
  //     const { secret, token, user } = data;
  //     const jwtClaims = {
  //       sub: token.sub,
  //       name: token.name,
  //     };

  //     const encodedToken = jwt.sign(jwtClaims, secret, {
  //       expiresIn: "60 days",
  //       algorithm: "HS512",
  //     });
  //     return encodedToken;
  //   },
  //   async decode(data: any) {
  //     const { secret, token, maxAge } = data;
  //     const verify = jwt.verify(token, secret) as JWT;

  //     return verify;
  //   },
  // },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const { res } = await apiReqHandler({
          endPoint: `${process.env.API_ROUTE}/auth/login`,
          method: "POST",
          payload,
        });
        const data = await res?.data;
        if (res?.status !== 200) {
          throw new Error(data.message);
        }
        if (res.status === 200 && data.user) {
          console.log(data);
          return data.user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  // callbacks: {
  //   async jwt(params: any) {
  //     const { token, user, account, profile, isNewUser } = params;
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //     }
  //     return token;
  //   },
  //   async session(params: any) {
  //     const { session, token } = params;

  //     const user = session.user._id && { account: session.user };

  //     const encodedToken = jwt.sign(token, process.env.TOKEN_SECRET as any, {
  //       algorithm: "HS256",
  //     });

  //     session.id = token.sub;
  //     session.token = encodedToken;
  //     session.user = {
  //       // ...user.account,
  //       firstName: user.firstName,
  //       email: user.email,
  //       lastName: user.lastName,
  //       isAdmin: user.isAdmin,
  //     };
  //     return Promise.resolve(session);
  //   },
  // },
});
