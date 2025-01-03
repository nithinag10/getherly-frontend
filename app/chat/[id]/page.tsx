'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getMessages, sendMessage, getSummary } from '../../services/api'
import { Loader2, Copy, X } from 'lucide-react'
import { useUserId } from '@/hooks/useUserId'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Define the Message interface
interface Message {
  id?: string; // Optional, as temp messages won't have an ID initially
  tempId?: string; // Temporary ID for client-side tracking
  sender_id: string;
  sender_name?: string;
  content: string;
  timestamp?: string | null; // Optional timestamp
}

export default function ChatPage() {
  const { id: routeId } = useParams()
  const userId = useUserId()
  const id = Array.isArray(routeId) ? routeId[0] : routeId
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCloseSummary = () => {
    setSummary(null)
  }

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        const result = await getMessages(id);

        const fetchedMessages: Message[] = Array.isArray(result.messages)
          ? result.messages.map((msg: Message) => ({
              id: msg.id,
              sender_id: msg.sender_name,
              content: msg.content,
              timestamp: msg.timestamp,
            }))
          : [];

        setMessages((prevMessages) => {
          const existingMessageMap = new Map<string, Message>(
            prevMessages.map((msg) => [msg.id || msg.tempId || '', msg])
          );

          const reconciledMessages = [...fetchedMessages, anchorMessage].map((msg) =>
            existingMessageMap.has(msg.id || '')
              ? { ...existingMessageMap.get(msg.id || ''), ...msg }
              : msg
          );

          return reconciledMessages;
        });
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);

    return () => clearInterval(interval);
  }, [id]);

  const handleSendMessage = async () => {
    if (!id || !newMessage.trim() || !userId) return

    const tempMessage: Message = {
      tempId: `temp-${Date.now()}`,
      sender_id: userId,
      content: newMessage,
      timestamp: null,
    }

    setMessages((prevMessages) => [...prevMessages, tempMessage])
    setNewMessage('')

    try {
      const response = await sendMessage(id, userId, newMessage)
      const { data } = response

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempMessage.tempId
            ? { ...msg, id: data.message_id, tempId: undefined, ...data }
            : msg
        )
      )
    } catch (error) {
      console.error('Failed to send message:', error)

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.tempId !== tempMessage.tempId)
      )
    }
  }

  const handleGetSummary = async () => {
    if (id) {
      setIsLoadingSummary(true)
      try {
        const result = await getSummary(id)
        const summaryText = result.summary?.summary || 'No summary available.'
        setSummary(summaryText)
      } catch (error) {
        console.error('Failed to get summary:', error)
        setSummary('Failed to load summary.')
      } finally {
        setIsLoadingSummary(false)
      }
    }
  }

  const handleCopyInviteCode = async () => {
    if (id) {
      await navigator.clipboard.writeText(id)
    }
  }

  const handleCopySummary = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-900">
      <header className="bg-zinc-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat</h1>
        {id && (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-violet-600 hover:bg-violet-700 transition-colors"
            >
              Invite
            </Button>
            <Button
              onClick={() => {
                handleGetSummary()
                setIsSummaryOpen(true)
              }}
              className="bg-violet-600 hover:bg-violet-700 transition-colors"
              disabled={isLoadingSummary}
            >
              {isLoadingSummary ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Catch Up'
              )}
            </Button>
          </div>
        )}
      </header>

      {/* Summary Dialog */}
      <Dialog open={isSummaryOpen && summary !== null} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="bg-zinc-800 border-zinc-700 text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold flex justify-between items-center">
              Chat Summary
              <div className="flex gap-2">
                <Button
                  onClick={handleCopySummary}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-zinc-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsSummaryOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-zinc-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="text-zinc-100 pr-6 space-y-4 whitespace-pre-wrap leading-relaxed max-h-[70vh] overflow-y-auto">
            {summary?.split('\n').map((paragraph, index) => (
              <p key={index} className={`
                ${paragraph.includes('🔍') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('👥') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('⏳') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('📋') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('🎉') ? 'text-violet-400 font-semibold mt-6' : ''}
              `}>
                {paragraph}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {summary !== null && (
        <div className="bg-zinc-700 p-6 m-4 rounded-lg relative">
          <button
            onClick={handleCloseSummary}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            aria-label="Close summary"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-4 text-white">Chat Summary</h2>
          <div className="text-zinc-100 pr-6 space-y-4 whitespace-pre-wrap leading-relaxed">
            {summary.split('\n').map((paragraph, index) => (
              <p key={index} className={`
                ${paragraph.includes('🔍') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('👥') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('⏳') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('📋') ? 'text-violet-400 font-semibold mt-6' : ''}
                ${paragraph.includes('🎉') ? 'text-violet-400 font-semibold mt-6' : ''}
              `}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {id ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-0">
          {messages.map((message, index) => (
            <div key={message.id || message.tempId || index} className="bg-zinc-800 p-3 rounded-lg">
              <p>
                <strong className="text-violet-400">{message.sender_id}: </strong>
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="p-4 bg-zinc-800 text-center">
          <p className="text-zinc-400">Select a chat or create a new one to start messaging</p>
        </div>
      )}

      {id && (
        <div className="p-4 bg-zinc-800">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
            />
            <Button onClick={handleSendMessage} className="bg-violet-600 hover:bg-violet-700">
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="bg-zinc-800 border border-zinc-700 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-zinc-100">Invite to Chat</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-sm text-zinc-400 mb-4">Share this chat ID with others to invite them:</p>
            <div className="flex items-center gap-2 p-3 bg-zinc-900 rounded-lg">
              <code className="flex-1 text-violet-400">{id}</code>
              <Button 
                onClick={handleCopyInviteCode} 
                size="sm"
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
