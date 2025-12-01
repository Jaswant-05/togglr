import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "@workspace/db/client";
import { userSignInSchema } from "@workspace/types/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";


export const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials : {
        email: { label: "email", type: "text", placeholder: "Email" } ,
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { data, error} = userSignInSchema.safeParse({
          email : credentials.email,
          password : credentials.password
        })

        if(!data || error){
          throw new Error(error.message)
        }

        const user = await prisma.user.findFirst({
          where: {
            email: data.email
          }
        });
        
        if (!user || !user.password) {
          return null;
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid username or password");
        }
        return { id: user.id, email: user.email };
      }
    }),
    Google,
    Apple
  ],
  callbacks:{
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn : "/login"
  },
  session : {
    strategy : "jwt"
  }
};