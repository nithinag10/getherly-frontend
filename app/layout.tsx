'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CreateChatModal } from '../components/create-chat-modal'
import { JoinChatModal } from '../components/join-chat-modal'
import { getRecentChats } from './services/api'
import { LandingPage } from '@/components/landing_page'

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

