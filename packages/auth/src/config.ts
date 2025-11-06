import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "@workspace/db/client"
import bcrypt from "bcryptjs";

export const config = {
  providers: [
    Credentials({
      credentials : {
        username: { label: "Username", type: "text", placeholder: "Email" } ,
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        //Add Zod validation later
        const username = credentials?.username as string
        const password = credentials?.password as string

        if (!username || !password) {
          throw new Error("Missing Credentials");
        }
        
        const user = await prisma.user.findFirst({
          where: {
            email: username
          }
        });
        
        if (!user || !user.password) {
          return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid username or password");
        }
        return { id: user.id, email: user.email };
      }
    }),
    Google,
    Apple
  ]
};