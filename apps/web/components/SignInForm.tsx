"use client"

import { UserSignIn, userSignInSchema } from "@workspace/types/types"
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { zodResolver } from "@workspace/ui/hooks/zodresolver"
import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form"

export default function SignInForm(){
  const form = useForm<UserSignIn>({
    resolver: zodResolver(userSignInSchema),
    defaultValues : {
      email : "",
      password : ""
    }
  });

  const onSubmit = async(values: UserSignIn) => {
    console.log(values);
    const result = await signIn("credentials", values);
  }
  return(
    <>
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
    </>
  )
}