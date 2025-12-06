"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation" // Import router
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const fullName = formData.get("full_name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    // 1. Client-side validation: Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      setIsLoading(false)
      return
    }

    // 2. Backend Logic: Sign up
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // This is where "Full Name" gets saved to the database
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      console.error(error)
      alert(error.message)
      setIsLoading(false)
    } else {
      alert("Account created! Please check your email to verify your account.")
      router.push("/authentication/login")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 ", className)} {...props}>
      <FieldGroup >
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
        </div>
        <Field >
          <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
          <Input id="name" type="text" name="full_name" placeholder="John Doe" required className="border border-[#556378]" />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required className="border border-[#556378]" />

        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" name= "password" required className="border border-[#556378]"/>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" name="confirm-password" required className="border border-[#556378]" />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" className="bg-[#556378] w-full cursor-pointer" disabled={isLoading}>
             {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
