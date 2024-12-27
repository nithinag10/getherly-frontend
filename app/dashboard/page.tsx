'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateChatModal } from '../../components/create-chat-modal'
import { JoinChatModal } from '../../components/join-chat-modal'

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center">
          <span className="text-lg font-semibold tracking-tight">Gatherly</span>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="md:col-span-1 bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">Recent Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">No recent chats</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100">Welcome to Gatherly</CardTitle>
              <CardDescription className="text-zinc-400">Start a new chat or join an existing one</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button onClick={() => setIsCreateModalOpen(true)} className="bg-violet-600 hover:bg-violet-700">
                Create Chat
              </Button>
              <Button onClick={() => setIsJoinModalOpen(true)} className="bg-zinc-700 hover:bg-zinc-600">
                Join Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <CreateChatModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <JoinChatModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  )
}

