'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Assuming your forms use 'email' and 'password' as input names
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // You can return this error to display it on the frontend
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Redirect to your reservation dashboard
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // You might want to capture extra data here (e.g., Student ID) for Resurv
  // const studentId = formData.get('student_id') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        // Redirect here after clicking the email confirmation link
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    }
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
}