const API_BASE_URL =
  "https://gatherly-app-592179280005.us-central1.run.app/api";

export async function createChat(
  creatorId: string,
  chatName: string,
  agenda: string
) {
  const response = await fetch(`${API_BASE_URL}/chats/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creator_id: creatorId,
      chat_name: chatName,
      agenda,
    }),
  });
  return response.json();
}

export async function joinChat(chatId: string, userId: string) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });
  return response.json();
}

export async function sendMessage(
  chatId: string,
  userId: string,
  content: string
) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, content }),
  });
  return response.json();
}

export async function getMessages(chatId: string) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`);
  return response.json();
}

export async function getSummary(chatId: string) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}/summary`);
  return response.json();
}

export async function getRecentChats(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/chats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    return { chats: [] };
  }
}
