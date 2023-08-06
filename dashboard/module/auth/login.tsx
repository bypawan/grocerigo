"use client";
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession, useSession } from "next-auth/react";

import { loginSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

export const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.STATUS === "SUCCESS") router.push("/");
  }, [session, router]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    const session = await getSession();

    if (session?.user?.STATUS === "FAILURE")
      return toast({
        variant: "destructive",
        description: session.user.MESSAGE,
      });

    if (session?.user?.STATUS === "SUCCESS")
      return toast({
        description: session.user.MESSAGE,
      });
  };

  if (session === undefined || session?.user?.STATUS === "SUCCESS")
    return (
      <div className="mt-8">
        <Loader />
      </div>
    );

  return (
    <Form {...form}>
      <form className="mt-10" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-8">
            {form.formState.isSubmitting ? (
              <Loader />
            ) : (
              <Button
                className="bg-[#fec887] text-[#2d2417] hover:bg-[#fceae5] hover:text-[#2d2417]"
                type="submit"
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
