import Image from 'next/image'
import Script from 'next/script'  // Add this import
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Share2, FileText, Smartphone } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">

      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4QK9DQWRWW"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4QK9DQWRWW', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      {/* Header with proper centering */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700" />
              <span className="text-lg font-semibold tracking-tight">Gatherly</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="#pricing"
                className="text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                Pricing
              </Link>
              <Button
                variant="secondary"
                className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                asChild
              >
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
              Plan That Epic Trip or Party — No BS 🏖️🥳
            </h1>
            <p className="text-zinc-400 text-lg">
              Tired of group chats that drag on and go nowhere? Let our AI keep 
              everyone on track, so you can focus on living your best life! 
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700" asChild>
                <Link href="/register">Create Your First Chat</Link>
              </Button>
              <Button
                size="lg"
                className="bg-zinc-700 hover:bg-zinc-600 border border-violet-500/30 text-violet-100"
                asChild
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="how-it-works" className="py-24 space-y-12">
          <h2 className="text-2xl font-medium text-center bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            How It Works 🔥
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
            {/* Feature 1 */}
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-violet-600/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-100">Start Your Squad Chat</h3>
              <p className="text-zinc-400">
                Create a chat with a clear agenda for your trip or party crew. 
                Our AI keeps track of the agenda, ensuring no plans fall through the cracks. 
                Say goodbye to endless group texts; we&apos;ve got you.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-violet-600/10 rounded-lg">
                <Share2 className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-100">No Accounts, Just Vibes</h3>
              <p className="text-zinc-400">
                Send a short invite code to your squad. They&apos;re in—no sign-ups, 
                no forms. Jump straight into the conversation.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-violet-600/10 rounded-lg">
                <FileText className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-100">Sassy Summaries</h3>
              <p className="text-zinc-400">
                Our AI whips up quick highlights of the chat — zero fluff. 
                Perfect for catching up if you snoozed those notifications. 
              </p>
            </div>
          </div>

          {/* NEW Feature 4 - WhatsApp Bot Beta */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-4 mt-12">
            <div className="space-y-4 text-center md:col-span-3 lg:col-span-3">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-violet-600/10 rounded-lg">
                <Smartphone className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-medium text-zinc-100">WhatsApp Bot (Beta)</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Our latest addition for the ones who <span className="font-bold">really</span> can’t leave WhatsApp. 
                Join group chats through our in-development WhatsApp bot—no sign-in, no fuss. 
                It’s the easiest way to rally your squad, especially if they’re all about that 
                “People does everything on mobile” life. 
                <br />
                <span className="text-violet-200 font-semibold">Jump in now and flex on your friends before it’s cool!</span>
              </p>
            </div>
          </div>
        </section>

        {/* Features Showcase Section */}
        <section className="py-24 bg-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-medium text-center bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-16">
              Why Hearts Gatherly ❤️
            </h2>

            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-violet-400">Super-Fast & Super-Private</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  Jump in with a simple code—no spammy forms, no awkward registrations. 
                  Keep every plan hush-hush (or wide open—your call). 
                </p>
              </div>
              <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-700">
                <Image
                  src="/screenshot_1.png"
                  alt="Quick join interface"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24 md:grid-flow-row-dense">
              <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-700 md:order-1">
                <Image
                  src="/screenshot_3.png"
                  alt="AI assistant in action"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-violet-400">AI Hype Person</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  Our AI keeps chats on track! 🚨 It intervenes when things go off-topic 
                  and warns anyone steering the conversation sideways. Stay focused, stay fun!
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-violet-400">Instant Recaps & Catch-Up</h3>
                <p className="text-zinc-300 text-lg leading-relaxed">
                  Busy living your best life? No worries. Our AI does the 
                  heavy lifting with short and sweet recaps, so you can 
                  jump back in whenever you want.
                </p>
              </div>
              <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-2xl border border-zinc-700">
                <Image
                  src="/screenshot_2.png"
                  alt="Summary interface"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section id="pricing" className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-medium text-center bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-16">
              Early Access Pricing 💸
            </h2>
            
            <div className="bg-zinc-800/50 rounded-2xl p-8 border border-violet-500/20 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-violet-500/20 text-violet-400 text-sm rounded-full mb-3">
                    Early Adopter Special
                  </span>
                  <h3 className="text-2xl font-medium text-zinc-100">Free Access</h3>
                </div>
                <p className="text-3xl font-bold text-zinc-100">$0</p>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-zinc-300">
                  We&apos;re all about building the next cool thing together, so it&apos;s free 
                  for the ones who shape our vibe. No strings, no cap.
                </p>
                <ul className="space-y-3">
                  {[
                    "Unlimited group chats",
                    "AI hype person for planning",
                    "Sassy chat summaries",
                    "WhatsApp Bot (Beta) included",
                    "Early access to new features",
                    "Help steer our product roadmap"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center text-zinc-300">
                      <svg
                        className="w-5 h-5 text-violet-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white" asChild>
                  <Link href="/register">Get Started Free</Link>
                </Button>
                <p className="text-sm text-zinc-400 text-center">
                  Wanna chat?{" "}
                  <a
                    href="mailto:nithinag10@gmail.com"
                    className="text-violet-400 hover:underline"
                  >
                    Slide into our inbox
                  </a>
                </p>
              </div>
            </div>
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
              <Link
                href="#"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
