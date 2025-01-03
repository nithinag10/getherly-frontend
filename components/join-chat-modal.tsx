import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { joinChat } from '../services/api'
import { useUserId } from '@/hooks/useUserId'

interface JoinChatModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function JoinChatModal({ isOpen, onClose, onSuccess }: JoinChatModalProps) {
  const router = useRouter()
  const [joinCode, setJoinCode] = useState('')
  const userId = useUserId()

  const handleJoinChat = async () => {
    if (!userId) {
      console.error('User not authenticated')
      return
    }

    try {
      await joinChat(joinCode, userId)
      await onSuccess() // Reload chats
      router.push(`/chat/${joinCode}`)
      onClose()
    } catch (error) {
      console.error('Failed to join chat:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Join a Chat</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter a chat code to join an existing chat.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="joinCode" className="text-right">
              Chat Code
            </Label>
            <Input
              id="joinCode"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="col-span-3 bg-zinc-700 border-zinc-600 text-zinc-100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleJoinChat} className="bg-violet-600 hover:bg-violet-700">Join Chat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

