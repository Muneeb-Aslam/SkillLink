import { isPasswordValid } from "@/lib/jwt";
import databaseConnection from "@/lib/mongoose";
import { Users } from "@/models/users";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials: any) {
        await databaseConnection();
        const user = await Users.findOne({
          email: credentials.email,
        });
        // Check if user exists
        if (!user) {
          return null;
        }

        // Validate password
        const isPasswordMatch = await isPasswordValid(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          return null;
        }
        if (user) {
          return {
            id: user._id,
            email: user.email,
            name:user.name,
            role:user.role,
            phone:user.phone,
            isVerify:user.isVerify,
          };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await Users.findOne(
        { email: session.user?.email });
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: user?._id,
          role:user?.role,
          phone:user?.phone,
          isVerfify:user?.isVerify,
        },
      };
      return newSession;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

