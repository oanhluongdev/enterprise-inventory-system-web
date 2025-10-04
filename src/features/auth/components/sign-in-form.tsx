"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInInputType } from "../server/actions/signin/types";
import { SignInSchema } from "../server/actions/signin/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignInForm = () => {
  const router = useRouter();
  const [isError, setError] = useState(false);
  const form = useForm<SignInInputType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleSubmit = async (inputData: SignInInputType) => {
    const result = await signIn("credentials", {
      username: inputData.username,
      password: inputData.password,
      redirect: false,
    });
    if (result?.error) {
      setError(true);
    } else {
      setError(false);
      router.push("/");
    }
  };
  return (
    <div className="w-[360px] flex flex-col space-y-4 border rounded p-4">
      <h2 className="w-full text-center font-bold text-2xl">Login</h2>
      <Form {...form}>
        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    className="rounded"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                    className="rounded"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && (
            <span className="text-destructive text-sm">
              Username or password is incorrect!
            </span>
          )}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="default"
              type="submit"
              className="rounded cursor-pointer min-w-[100px]"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
