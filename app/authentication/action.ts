'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // 1. Get the data from the form
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 2. CHECK THE DATABASE (Authenticate user)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Return the error message to the client so you can display it
    return { error: "Invalid email or password" }
  }

  // 3. If valid, redirect to your dashboard
  revalidatePath('/', 'layout')
  redirect('/authentication/dashboard')
}