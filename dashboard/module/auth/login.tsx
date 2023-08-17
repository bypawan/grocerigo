"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession, useSession } from "next-auth/react";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

export const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (session?.user?.STATUS === "SUCCESS") router.push("/store/dashboard");
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

    if (session?.user?.STATUS === "SUCCESS") {
      router.push("/store/dashboard");
      toast({ description: session.user.MESSAGE });
    }
  };

  if (session === undefined || session?.user?.STATUS === "SUCCESS")
    return (
      <div className="mt-8">
        <Loader />
      </div>
    );

  return (
    <Form {...form}>
      <form className="mt-5 max-w-sm" onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className="mt-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={isVisible ? "text" : "password"} {...field} />
                    {isVisible ? (
                      <Eye
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute top-[calc(50%-12px)] right-2 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute top-[calc(50%-12px)] right-2 cursor-pointer"
                      />
                    )}
                  </div>
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
