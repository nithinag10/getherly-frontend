'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import {usePathname } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isChatRoute = pathname?.startsWith('/chat')

  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-zinc-100`}>
        {isChatRoute ? (
          // Your existing chat layout
          <div className="flex h-screen">
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>
        ) : (
          // For non-chat routes, just render the children
          children
        )}
      </body>
    </html>
  )
}

