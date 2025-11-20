import { auth } from "@/auth";
import prisma, { Prisma } from "@workspace/db/client";
import { CreateFeatureFlag, createFeatureFlagScheam } from "@workspace/types/types";

export async function createFeature(formData: CreateFeatureFlag){
  // Zod Validation
  const { data, error, success } = createFeatureFlagScheam.safeParse(formData);
  if(!success){
    return({
      success: false,
      error : error.errors[0]?.message
    })
  }  

  // Try/catch to catch thrown errors
  try{
    const session = await auth();
    if(!session || !session.user?.id){
      throw new Error("Unauthorized");
    }
    
    // Check if project with same company and name exists
    const existingFeature = await prisma.featureFlag.findUnique({
      where : {
        key_projectId : {
          key : data.key,
          projectId: data.projectId
        }
      }
    });

    if(existingFeature){
      throw new Error("Project Already Exists");
    }

    // Create and return the new project
    const featureFlag = await prisma.featureFlag.create({ data });

    return({
      success : true,
      data : featureFlag
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
