"use client"

import { zodResolver } from "@workspace/ui/hooks/zodresolver"
import { useForm } from "react-hook-form"
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { signUp } from "@/actions/auth";
import { userSignUpSchema } from "@workspace/types/types";

export default function SignUpForm(){
    const form = useForm<z.infer<typeof userSignUpSchema>>({
      resolver : zodResolver(userSignUpSchema),
      defaultValues: {
        email : "",
        password : ""
      }
    });

    async function onSubmit(values: z.infer<typeof userSignUpSchema>) {
      const { data, error, success} = await signUp(values)
      if(!success){
        console.log(error);
      }
      console.log(data);
    }
    
    return(
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Add signin with google and gitub buttons */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    )
}