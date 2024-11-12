// types/chat.ts
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

export type StreamCallback = (chunk: string) => void;
