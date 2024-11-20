export interface ChatResponse {
  message: string;
  error?: string;
}

export interface ChatMessage {
  content: string;
  role: "assistant" | "user";
}

export interface VisionResponse {
  message: string;
  error?: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export type StreamCallback = (chunk: string) => void;
