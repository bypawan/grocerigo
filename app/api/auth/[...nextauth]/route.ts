import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", placeholder: "Password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        try {
          const res = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          // Check if the response status is not okay
          if (!res.ok) {
            throw new Error("Login failed. Server is having some issues.");
          }

          // Parse the response as JSON
          const user = await res.json();

          return user;
        } catch (error) {
          // Handle errors and log them
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token;

      return session;
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
