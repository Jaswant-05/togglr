import prisma from "@workspace/db/client";

export async function getFeature(
  { featureId }:
  { featureId: string }
){
  if(!featureId){
    throw new Error("Missing featureId");
  }

  const featureFlag = await prisma.featureFlag.findUnique({
    where : {
      id : featureId
    }
  });

  return featureFlag
}

export async function getAllFeatures(){
  const featureFlags = await prisma.featureFlag.findMany();

  return featureFlags
}