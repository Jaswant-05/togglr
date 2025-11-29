import prisma from "@workspace/db/client";

export async function getProject(
  { projectId }:
  { projectId: string }
){
  if(!projectId){
    throw new Error("Missing projectId");
  }

  const project = await prisma.project.findUnique({
    where : {
      id : projectId
    }
  });

  return project
}

export async function getAllProjects(){
  const projects = await prisma.project.findMany();

  return projects
}