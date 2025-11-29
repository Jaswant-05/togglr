import prisma from "@workspace/db/client";

export async function getCompany(
  { companyId }:
  { companyId: string }
){
  if(!companyId){
    throw new Error("Missing companyId");
  }

  const company = await prisma.company.findUnique({
    where : {
      id : companyId
    }
  });

  return company
}

export async function getAllCompanies(){
  const companies = await prisma.company.findMany();

  return companies
}