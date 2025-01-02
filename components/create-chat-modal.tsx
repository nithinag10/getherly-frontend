import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createChat } from '../services/api'
import { useUserId } from '@/hooks/useUserId'

interface CreateChatModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateChatModal({ isOpen, onClose, onSuccess }: CreateChatModalProps) {
  const router = useRouter()
  const userId = useUserId()
  const [chatName, setChatName] = useState('')
  const [agenda, setAgenda] = useState('')
  const [error, setError] = useState('')

  const handleCreateChat = async () => {
    if (!userId) {
      setError('User not authenticated')
      return
    }

    try {
      const result = await createChat(userId, chatName, agenda)
      if (result && result.chat && result.chat.id) {
        await onSuccess(); // Reload chats
        router.push(`/chat/${result.chat.id}`)
        onClose()
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      console.error("Failed: ", error)
      // You might want to set an error state here and display it to the user
      setError('Failed to create chat. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Create a Chat</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Start a new group chat by providing a name and agenda.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chatName" className="text-right">
              Chat Name
            </Label>
            <Input
              id="chatName"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="col-span-3 bg-zinc-700 border-zinc-600 text-zinc-100"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="agenda" className="text-right">
              Agenda
            </Label>
            <Input
              id="agenda"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="col-span-3 bg-zinc-700 border-zinc-600 text-zinc-100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateChat} className="bg-violet-600 hover:bg-violet-700">Create Chat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

