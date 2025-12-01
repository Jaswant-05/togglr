"use client"

import { createFeature } from "@/actions/feature";
import { FeatureFlag } from "@workspace/db/client";
import { CreateFeatureFlag, createFeatureFlagScheam } from "@workspace/types/types"
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { zodResolver } from "@workspace/ui/hooks/zodresolver"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form"

// don't need projectId in the form 
type CreateFeatureFlagReduced = Omit<CreateFeatureFlag,"projectId">
const createFeatureFlagReduced = createFeatureFlagScheam.omit({projectId : true})

export default function FeatureForm({ projectId } : { projectId : string }){
  const router = useRouter();

  useEffect(() => {
    if(!projectId){
      router.push('/');
    }
  }, [projectId, router]);

  const form = useForm<CreateFeatureFlagReduced>({
    resolver : zodResolver(createFeatureFlagReduced),
    defaultValues : {
      key : "",
    }
  });

  const onSubmit = async(values : CreateFeatureFlagReduced) => {
    //TODO : check for error specifically the project id not being valid and handle responses accordingly and Toasts
    console.log(values);
    console.log(projectId);
    const result = await createFeature({ key: values.key, projectId })
  }
  
  return(
    <>  
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Feature Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}