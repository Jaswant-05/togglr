import { auth } from "@/auth";
import prisma, { Prisma } from "@workspace/db/client";
import { CreateProject, createProjectSchema } from "@workspace/types/types";

export async function createProject(formData : CreateProject){
  //Zod Validation
  const { data, error, success } = createProjectSchema.safeParse(formData);
  if(!success){
    return ({
      success: false,
      error : error.errors[0]?.message
    })
  }

  // Everything Inside Throws
  try{
    // Session Check
    const session = await auth();
    if(!session || !session.user?.id){
      throw new Error("Unauthorized");
    }
    
    // Check if project with same company and name exists
    const existingProject = await prisma.project.findUnique({
      where : {
        name_companyId : {
          name : data.name,
          companyId: data.companyId
        }
      }
    });

    if(existingProject){
      throw new Error("Project Already Exists");
    }

    // Create and return the new project
    const project = await prisma.project.create({ data });

    return({
      success : true,
      data : project
    })
    

  }
  catch(e){
    // TODO: Error handling using classes fine for now.
    if(e instanceof Error){
      return({
        success : false,
        error : e.message
      })
    }
    else if (e instanceof Prisma.PrismaClientKnownRequestError){
      return({
        success : false,
        error : e.message
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
