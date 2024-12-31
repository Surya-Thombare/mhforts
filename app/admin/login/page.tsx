import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LoginForm } from '@/components/login-form'

export default async function AdminLoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}