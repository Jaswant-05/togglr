"use server"

import { auth } from "@/auth";
import prisma, { Prisma } from "@workspace/db/client";
import { CreateCompany, createCompanySchema } from "@workspace/types/types";

export async function createCompany(formData: CreateCompany){
  // Input Validation
  const { data, error, success } = createCompanySchema.safeParse(formData);
  if(!success){
    return({
      success : false,
      error : error.errors[0]?.message
    })
  }

  try{  
    // Check Session and get userId
    const session = await auth();
    if(!session || !session.user?.id) throw new Error("Unauthorized")
  
    const userId = session.user.id;

    // Check if Company Exists
    const existingCompany = await prisma.company.findUnique({
      where : {
        name : data.name,
        ownerId : userId
      }
    });

    if(existingCompany) throw new Error("Company Already Exists");

    // Create and return new company with session user as owner
    const company = await prisma.company.create({
      data: {
        ownerId : userId,
        name : data.name
      },
    });

    return({
      success : true,
      data : company
    });

  }
  catch(e){
    // Catch Errors thrown in the try block.
    // TODO:  later use proper error classes
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

// TODO write update company method