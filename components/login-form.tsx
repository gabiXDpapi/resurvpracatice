"use client"

import { cn } from "@/lib/utils"
import { login } from "@/app/authentication/action" // Import your server action
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    
    // Call the Supabase Server Action
    const result = await login(formData)

    if (result?.error) {
      // If login fails, show error and stop loading
      setError(result.error)
      setIsLoading(false)
    }
    // If login succeeds, the Server Action inside actions.ts will 
    // automatically redirect the user to the dashboard.
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
    > 
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center text-[#556378]">
          <h1 className="text-5xl font-extrabold">Resurv</h1>
        </div>
        
        <Field>
          <FieldLabel htmlFor="email" className="text-[#556378]">Email</FieldLabel>
          <Input 
            id="email" 
            name="email" // <--- CRITICAL: Needed for FormData
            type="email" 
            placeholder="m@example.com" 
            required 
            className="border border-[#556378]"
          />
        </Field>
        
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className="text-[#556378]">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-[#556378]"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            name="password" // <--- CRITICAL: Needed for FormData
            type="password" 
            required 
            className="border border-[#556378]"
          />
        </Field>

        {/* Error Message Display */}
        {error && (
          <div className="text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <Field>
          <Button type="submit" className="w-full bg-[#556378] cursor-pointer" disabled={isLoading}> 
            {isLoading ? "Logging in..." : "Login"} 
          </Button>
        </Field>
        
        <Field>
          <FieldDescription className="text-center text-[#556378]" >
            Don't have an account?{" "}
            <a href="/authentication/signup" className="underline underline-offset-4 ">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}