import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main>
      <h1>Dashboard de URBIVA</h1>

      <p>Bienvenido a URBIVA.</p>

      <p>
        Sesión iniciada como:{' '}
        <strong>{user.email}</strong>
      </p>
    </main>
  )
}
