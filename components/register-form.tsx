'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { faker } from '@faker-js/faker';

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(
        "https://gatherly-app-592179280005.us-central1.run.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Registration failed");
      }

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsPending(false);
    }
  }

  function handleLazy() {
    // Use Faker to generate unique credentials
    const generatedName = faker.internet.userName();
    const generatedEmail = faker.internet.email();
    const generatedPassword = faker.internet.password();

    setName(generatedName);
    setEmail(generatedEmail);
    setPassword(generatedPassword);

    // Alert the user to store the credentials
    window.alert(
      `Your generated credentials are:\n\nName: ${generatedName}\nEmail: ${generatedEmail}\nPassword: ${generatedPassword}\n\nPlease save these in your password manager.`
    );
  }

  return (
    <Card className="w-[350px] bg-zinc-800 border-zinc-700 text-zinc-100">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription className="text-zinc-400">
          Create an account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex items-center justify-between mt-4">
            <Button
              className="bg-violet-600 hover:bg-violet-700"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register"}
            </Button>
            <Button
              variant="secondary"
              className="bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
              onClick={handleLazy}
              type="button"
            >
              I&apos;m Lazy
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
