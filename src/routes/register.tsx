import { createFileRoute } from '@tanstack/react-router'

import { RegisterForm } from '#/components/register-form'
import { requireAnonymous } from '#/lib/supabase/require-anonymous'

export const Route = createFileRoute('/register')({
  beforeLoad: requireAnonymous,
  component: Register,
})

function Register() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}
