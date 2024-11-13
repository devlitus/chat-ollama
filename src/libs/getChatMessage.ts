import type { ChatMessage, ChatResponse } from "../types/chat";
import ollama from "ollama";

let chatHistory: ChatMessage[] = [];

export const getChatMessage = async (
  userMessage: string,
  onChunk: (chunk: string) => void
): Promise<ChatResponse> => {
  try {
    chatHistory.push({
      content: userMessage,
      role: "user",
    });

    const messages = chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = (await Promise.race([
      ollama.chat({
        model: "llama3.2:latest",
        messages: messages,
        stream: true,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 4000)
      ),
    ])) as AsyncIterable<{ message?: { content: string } }>;

    let fullResponse = "";

    for await (const chunk of response) {
      if (chunk.message?.content) {
        fullResponse += chunk.message.content;
        onChunk(chunk.message.content);
      }
    }

    chatHistory.push({
      content: fullResponse,
      role: "assistant",
    });

    return {
      message: fullResponse,
      error: undefined,
    };
  } catch (error) {
    console.error("Error in chat completion:", error);
    return {
      message: "",
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while processing your message",
    };
  }
};

export const clearChatHistory = (): void => {
  chatHistory = [];
};

export const getChatHistory = (): ChatMessage[] => {
  return [...chatHistory];
};
