'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getMessages, sendMessage, getSummary } from '../../services/api'
import { Loader2 } from 'lucide-react' // Add this import

export default function ChatPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [summary, setSummary] = useState(null)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)

  const handleCloseSummary = () => {
    setSummary(null)
  }

  useEffect(() => {
    if (!id) return;

    const fetchMessages = async () => {
      try {
        const result = await getMessages(id);

        const fetchedMessages = Array.isArray(result.messages) ? result.messages : [];
        setMessages((prevMessages) => {
          const existingMessageMap = new Map(
            prevMessages.map((msg) => [msg.id || msg.tempId, msg])
          );

          const reconciledMessages = fetchedMessages.map((msg) =>
            existingMessageMap.has(msg.id)
              ? { ...existingMessageMap.get(msg.id), ...msg }
              : msg
          );

          return reconciledMessages;
        });
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages()
    const interval = setInterval(fetchMessages, 10000)

    return () => clearInterval(interval)
  }, [id])

  const handleSendMessage = async () => {
    if (!id || !newMessage.trim()) return

    const userId = '43398710-349f-41da-b29b-0f90094fafdc'
    const tempMessage = {
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
        const summaryText = result.summary?.summary || "No summary available."
        setSummary(summaryText)
      } catch (error) {
        console.error("Failed to get summary:", error)
        setSummary("Failed to load summary.")
      } finally {
        setIsLoadingSummary(false)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-900">
      <header className="bg-zinc-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat</h1>
        {id && (
          <Button 
            onClick={handleGetSummary} 
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
        )}
      </header>
      
      {summary !== null && (
        <div className="bg-zinc-700 p-4 m-4 rounded-lg relative">
          <button 
            onClick={handleCloseSummary}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white"
            aria-label="Close summary"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-2 text-white">Chat Summary</h2>
          <p className="text-zinc-100 pr-6">{summary}</p>
        </div>
      )}

      {id ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={message.id || message.tempId || index} className="bg-zinc-800 p-3 rounded-lg">
              <p>
                <strong className="text-violet-400">{message.sender_id}: </strong>
                {message.content}
              </p>
            </div>
          ))}
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
    </div>
  )
}
