'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserChats } from '@/services/api'
import { useUserId } from '@/hooks/useUserId'
import { Button } from '@/components/ui/button'
import { CreateChatModal } from '@/components/create-chat-modal'
import { JoinChatModal } from '@/components/join-chat-modal'

// Define the Chat interface
interface Chat {
  id: string;
  chat_name: string;
  agenda: string;
  last_message?: string;
  participant_count: number;
}

// Define the API response type
interface GetUserChatsResponse {
  chats: Chat[];
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userId = useUserId();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadChats = async () => {
      try {
        const response: GetUserChatsResponse = await getUserChats(userId);
        setChats(response.chats);
      } catch (error) {
        console.error('Failed to load chats:', error);
      }
    };

    loadChats();
  }, [userId]);

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-80 border-r border-zinc-800 flex flex-col">
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
              onClick={() => handleChatClick(chat.id)}
              className="p-4 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800"
            >
              <h3 className="font-semibold text-zinc-100">{chat.chat_name}</h3>
              <p className="text-sm text-zinc-400 truncate">{chat.agenda}</p>
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
      <div className="flex-1">
        {children}
      </div>

      <CreateChatModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <JoinChatModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  );
}
