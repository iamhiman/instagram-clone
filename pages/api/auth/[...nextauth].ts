import NextAuth, { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

interface ISessionProps {
  session: Session;
  token: JWT;
  user: User;
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, user, token }: ISessionProps) {
      session.user.username = session?.user?.name?.split(" ").join("").toLocaleLowerCase();
      session.user.uid = token.sub;

      return session;
    },
  },
  secret: process.env.SECRET,
});
