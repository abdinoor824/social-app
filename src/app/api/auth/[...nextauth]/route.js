// ...existing code...
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDb } from "@/lib/utils"; // adjust path as needed
import { user } from "@/lib/models"; // adjust path as needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        await connectToDb();
        const { username, password } = credentials;

        const existingUser = await user.findOne({ username });
        if (!existingUser) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: existingUser._id, name: existingUser.username };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/api/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// ...existing code...