import { LoginForm } from '@/components/login-form'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import Image from "next/image"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header with proper centering */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700" />
              <span className="text-lg font-semibold tracking-tight">Gatherly</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="#how-it-works" className="text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors">
                Pricing
              </Link>
              <Button variant="secondary" className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content with consistent centering */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <section className="py-24 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-medium tracking-tight bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Conversations with Purpose. Simplified.
            </h1>
            <p className="text-zinc-400 text-lg">
              Host focused group chats and let our AI do the tracking, so you can focus on the conversation.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700" asChild>
                <Link href="/register">Create Your First Chat</Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-zinc-800 hover:bg-zinc-700" asChild>
                <Link href="#how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="how-it-works" className="py-24 space-y-12">
          <h2 className="text-2xl font-medium text-center bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Create your chat"
                  fill
                  className="object-cover"
                />
              </div>
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-lg text-zinc-100">1. Create Your Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    In just a few clicks, set up your chat room and define your agenda or topic.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Invite participants"
                  fill
                  className="object-cover"
                />
              </div>
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-lg text-zinc-100">2. Invite Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    Share a simple link or code with your friends, classmates, or colleagues.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Engage and discuss"
                  fill
                  className="object-cover"
                />
              </div>
              <Card className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-lg text-zinc-100">3. Engage & Discuss</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    Talk freely. Our AI tracks key points and decisions, so you never lose track.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section id="pricing" className="py-24 space-y-12">
          <h2 className="text-2xl font-medium text-center bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-zinc-800 border-zinc-700 h-full">
              <CardHeader>
                <CardTitle className="text-zinc-100">Free</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>Create up to 3 chats</li>
                  <li>Basic AI summary for each chat</li>
                  <li>Standard privacy controls</li>
                </ul>
                <Button className="w-full" variant="secondary" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700 relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-violet-700/10" />
              <CardHeader>
                <CardTitle className="text-zinc-100">Pro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>Unlimited chats</li>
                  <li>Advanced AI analysis & quick polls</li>
                  <li>Priority customer support</li>
                </ul>
                <Button className="w-full bg-violet-600 hover:bg-violet-700" asChild>
                  <Link href="/register">Upgrade to Pro</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} Gatherly. All rights reserved.
            </p>
            <nav className="flex gap-6">
              <Link href="#" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

