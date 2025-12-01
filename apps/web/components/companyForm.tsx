"use client"

import { createCompany } from "@/actions/company";
import { CreateCompany, createCompanySchema } from "@workspace/types/types"
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { zodResolver } from "@workspace/ui/hooks/zodresolver"
import { useForm } from "react-hook-form"

// type, zod schema, defaultValues, form, onSubmit fn, label, placeholder

export default function CompanyForm(){
  const form = useForm<CreateCompany>({
    resolver : zodResolver(createCompanySchema),
    defaultValues : {
      name : ""
    }
  });

  const onSubmit = async(values : CreateCompany) => {
    const result = await createCompany(values);
    console.log(result);
    //TODO: Handle Error and show Toast for now just logging for testing
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
                  <FormLabel>Company Name</FormLabel>
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