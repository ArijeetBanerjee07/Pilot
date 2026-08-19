import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt", // store session in cookie — no DB needed
  },
  callbacks: {
    async signIn({ user, account }) {
      // Upsert user into Supabase on every login
      if (user.email) {
        await supabaseAdmin.from("users").upsert(
          {
            email: user.email,
            name: user.name ?? null,
            image: user.image ?? null,
            provider: account?.provider ?? "email",
            provider_account_id: account?.providerAccountId ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        );
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name ?? session.user.name;
        session.user.email = (token.email as string) ?? session.user.email;
        session.user.image = (token.picture as string) ?? session.user.image;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
});


