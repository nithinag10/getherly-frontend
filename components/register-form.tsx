'use client';

import { useActionState } from 'react';
import { register } from '../app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const initialState = {
  success: false,
  error: null,
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <Card className="w-[350px] bg-zinc-800 border-zinc-700 text-zinc-100">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription className="text-zinc-400">
          Create a new account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
              />
            </div>
          </div>
          {state?.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <Button className="w-full mt-4 bg-violet-600 hover:bg-violet-700" type="submit" disabled={isPending}>
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button variant="outline" className="w-full mb-2 border-zinc-600 text-zinc-100 hover:bg-zinc-700">
          Register with Google
        </Button>
        <p className="text-sm text-zinc-400">
          Already have an account? <a href="/login" className="text-violet-400 hover:underline">Login</a>
        </p>
      </CardFooter>
    </Card>
  );
}
