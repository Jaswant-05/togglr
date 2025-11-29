"use server"

import { auth } from "@/auth";
import prisma, { Prisma } from "@workspace/db/client";
import { UserInvite, userInviteSchema, UserSignUp, userSignUpSchema } from "@workspace/types/types";
import bcrypt from "bcryptjs";

export async function signUp(formData : UserSignUp){
  const { data, error, success } = userSignUpSchema.safeParse(formData);
  if(!success){
    return ({
      success: false,
      error
    })
  }

  try{

    const existingUser = await prisma.user.findUnique({
      where : { email : data.email }
    })
    
    if(existingUser){
      throw new Error("User Already Exists")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const payload : UserSignUp = {
      email: data.email,
      password: hashedPassword
    }

    const newUser = await prisma.user.create({
      data : payload,
      select : {
        id : true,
        email : true
      }
    });

    return({
      success : true,
      data : newUser
    });

  }
  catch(e){
    if(e instanceof Error){
      return({
        success : false,
        error : e.message
      })
    }
    else if (e instanceof Prisma.PrismaClientKnownRequestError){
      return({
        success : false,
        error : "Database Error"
      })
    }
    else{
      return({
        success : false,
        error : "Unkown Error occured"
      })
    }
  }
}

export async function inviteUser(formData : UserInvite){
  const { data, error, success } = userInviteSchema.safeParse(formData);
  if(!success){
    return({
      success: false,
      error
    });
  };
  try{
      // Getting current Session for the user and checking if a session exists
      const session = await auth();
      if(!session || !session.user?.id){
        throw new Error("Unauthorized")
      }

      // Check to see if the user is the owner of the company -> only owners can add new members
      const userId = session.user.id
      const company = await prisma.company.findUnique({
        where: {
          id : data.companyId
        }
      })
      if(company?.ownerId != userId){
        throw new Error("Unauthorized")
      }

      // Check to see if the new user already is a member of company.
      const existingUser = await prisma.user.findUnique({
        where : {
          email : data.email
        }
      })
      if(existingUser){
        throw new Error("User is Already a part of the organization");
      }

      //create an user entry in the db 

  }
  catch(e){
    if(e instanceof Error){
      return({
        success : false,
        error : e.message
      })
    }
    else if (e instanceof Prisma.PrismaClientKnownRequestError){
      return({
        success : false,
        error : "Database Error"
      })
    }
    else{
      return({
        success : false,
        error : "Unkown Error occured"
      })
    }
  }
}