'use client'

import { useFormStatus, useFormState } from 'react-dom'
import { login } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const initialState = {
  error: null,
  success: false,
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, initialState)
  const { pending } = useFormStatus()
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      router.push('/dashboard')
    }
  }, [state?.success, router])

  return (
    <Card className="w-[350px] bg-zinc-800 border-zinc-700 text-zinc-100">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription className="text-zinc-400">
          Enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100"
              />
            </div>
            {state?.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={pending}>
              {pending ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
