'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/src/utils/supabase/actions'

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
   console.log(data)
   return;
  }

  redirect('/addPlane')
}

export async function logout() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)


  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error')
  }

  redirect('/login')
}