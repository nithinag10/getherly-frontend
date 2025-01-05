'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getUserChats } from '@/services/api'
import { useUserId } from '@/hooks/useUserId'
import { Button } from '@/components/ui/button'
import { CreateChatModal } from '@/components/create-chat-modal'
import { JoinChatModal } from '@/components/join-chat-modal'
import { Menu, X } from 'lucide-react'

interface Chat {
  id: string;
  chat_name: string;
  agenda: string;
  last_message?: string;
  participant_count: number;
}


interface GetUserChatsResponse {
  chats: Chat[];
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter();
  const userId = useUserId();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const loadChats = useCallback(async () => {
    if (!userId) return;
    try {
      const response: GetUserChatsResponse = await getUserChats(userId);
      setChats(response.chats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  }, [userId]); // userId as dependency

  useEffect(() => {
    loadChats();
  }, [userId, loadChats]); // Add loadChats to dependencies

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex h-screen bg-zinc-900 relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-md"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-zinc-400" />
        ) : (
          <Menu className="h-6 w-6 text-zinc-400" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-200 ease-in-out
        w-[280px] md:w-80 border-r border-zinc-800 flex flex-col
        bg-zinc-900 md:bg-transparent z-40
      `}>
        <div className="p-4 border-b border-zinc-800">
          <div className="space-y-2">
            <Button
              className="w-full bg-violet-600 hover:bg-violet-700"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Chat
            </Button>
            <Button
              className="w-full bg-zinc-700 hover:bg-zinc-600"
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join Chat
            </Button>
          </div>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                handleChatClick(chat.id)
                setIsMobileMenuOpen(false)
              }}
              className="p-3 md:p-4 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800"
            >
              <h3 className="font-semibold text-zinc-100 text-sm md:text-base">{chat.chat_name}</h3>
              <p className="text-xs md:text-sm text-zinc-400 truncate">{chat.agenda}</p>
              {chat.last_message && (
                <p className="text-sm text-zinc-500 mt-1 truncate">
                  {chat.last_message}
                </p>
              )}
              <p className="text-xs text-zinc-600 mt-1">
                {chat.participant_count} participants
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-0">
        {children}
      </div>

      <CreateChatModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={loadChats}
      />
      <JoinChatModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={loadChats}
      />
    </div>
  );
}
