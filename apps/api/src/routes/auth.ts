import { NextFunction, Request, Response, Router } from "express"
import { userSignUpSchema } from "@workspace/types/types";
import bcrypt from "bcryptjs"
import prisma from "@workspace/db/client";

const router : Router = Router();

router.post("/signin", async(req : Request, res : Response, next: NextFunction) => {
  const { data, error } = userSignUpSchema.safeParse(req.body);

  if(error){
    return res.status(400).json({
      success : false,
      error : error.issues.map(issue => issue.message)[0]
    });
  }

  try{
    const existingUser = await prisma.user.findUnique({
      where : {
        email : data.email
      }
    });

    if(existingUser){
      throw new Error("User already Exists")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email : data.email,
        password : hashedPassword
      }
    }); 

    console.log(user)

    return res.status(200).json({
      success : true,
      message : "user created successfully"
    });

  } 
  catch(e){
    next(e)
  }
}); 

export default router