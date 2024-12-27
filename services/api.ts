interface LoginResponse {
  message: string;
  token: string;
}

interface RegisterResponse {
  message: string;
}

const API_BASE_URL =
  "https://gatherly-app-592179280005.us-central1.run.app/api";

export async function createChat(
  creatorId: string,
  chatName: string,
  agenda: string
) {
  console.log("Printing all the values");
  console.log(creatorId);
  console.log(chatName);
  console.log(agenda);
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

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  // Store JWT token
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}

// Helper to get stored token
export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

// Add auth header to requests
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}
