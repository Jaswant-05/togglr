"use client"

import { useForm } from "react-hook-form"
import { CreateProject, createProjectSchema } from "@workspace/types/types"
import { zodResolver } from "@workspace/ui/hooks/zodresolver"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { createProject } from "@/actions/project"

const createProjectSchemaReduced = createProjectSchema.omit({ companyId : true })
type CreateProjectReduced = Omit<CreateProject, "companyId">

// TODO: need to use a state management library and get active company from it pick between recoil,zustand, jotai for now lets just hardcode one for testing
export default function ProjectForm(){
  const [ companyId, setCompanyId ] = useState("4ea20a3f-5d88-402f-b28f-71311191a2f7") 
  const form = useForm<CreateProjectReduced>({
    resolver : zodResolver(createProjectSchemaReduced),
    defaultValues : {
      name : ""
    }
  })

  const onSubmit = async(values : CreateProjectReduced) => {
    const result = await createProject({ name : values.name, companyId })
    console.log(values)

    // TODO: Handle errors and show have Toasts
  }

  return(
    <>
    <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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