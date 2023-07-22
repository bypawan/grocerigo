"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getSession, signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/new/loader";

const formSchema = z.object({
  email: z.string().nonempty("Email is required.").email(),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Please create a password of minimum of 8 characters.")
    .max(20, "Please don't create a password longer than 20 characters.")
    .refine(
      (value) => /.*[A-Z].*/.test(value),
      "Add at least one uppercase letter."
    )
    .refine(
      (value) => /.*[a-z].*/.test(value),
      "Add at least one lowercase letter."
    )
    .refine((value) => /.*\d.*/.test(value), "Add at least one number.")
    .refine(
      (value) => /.*[^a-zA-Z\d\s].*/.test(value),
      "Add at least one symbol."
    ),
});

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user?.STATUS === "SUCCESS") router.push("/");
  }, [session, router]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (session === undefined || session?.user?.STATUS === "SUCCESS")
    return <Loader fullScreen={true} h={10} w={10} />;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    const session = await getSession();

    if (session?.user?.STATUS === "FAILURE") {
      toast.error(session?.user?.MESSAGE);
      setIsSubmitting(false);
      return;
    }

    if (session?.user?.STATUS === "SUCCESS") {
      toast.success(session?.user?.MESSAGE);
      router.push("/");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="email"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="******************"
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            {isSubmitting ? (
              <Loader h={8} w={8} />
            ) : (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </button>
            )}
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
