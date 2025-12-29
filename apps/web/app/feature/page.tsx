import { auth } from "@/auth";
import FeatureForm from "@/components/featureForm";;
import { redirect } from "next/navigation";

export default async function Page({
  searchParams
}:
  Readonly<{
    searchParams: Promise<{ projectId: string }>
  }>) {

  const session = await auth();
  if (!session || !session.user?.id) {
    redirect('/signin')
  }

  const params = await searchParams;
  const projectId = params.projectId;

  return (
    <>
      <FeatureForm projectId={projectId} />
    </>
  )
}