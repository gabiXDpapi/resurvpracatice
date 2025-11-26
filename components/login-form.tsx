  "use client"
  import { cn } from "@/lib/utils"
  import { useRouter } from "next/navigation"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"
  import Link from "next/link"
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
  } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"

  export function LoginForm({
    className,
    ...props
  }: React.ComponentProps<"form">) {
    const router = useRouter() 
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() 
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")
    const isLoginValid = true //CHANGE THIS WITH BACKEND FN

    if(isLoginValid)
      router.push("/authentication/dashboard");
    else
      {
        alert("Invalid email or password");
        setIsLoading(false);
      }
  }
    return (
      <form 
      onSubmit={handleSubmit} 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
      > 
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-5xl font-bold text-[#556378]">Resurv</h1>
          </div>
          <Field>
            <FieldLabel htmlFor="email" className="text-[#556378]">Email</FieldLabel>
            <Input id="email" type="email" className=" border-[#556378]" required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password" className="text-[#556378]" >Password</FieldLabel>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline text-[#556378]"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" className=" border-[#556378]" required />
          </Field>
          <Field>
            <Button type="submit" className="w-full bg-[#556378] text-[#EEF4ED]" disabled={isLoading}> 
            {isLoading ? "Logging in..." : "Login"} 
          </Button>
          </Field>
          <Field>
            <FieldDescription className="text-center text-[#556378]">
              Don't have an account?{" "}
              <a href="/authentication/signup" className="underline underline-offset-4 text-[#556378]">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    )
  }
