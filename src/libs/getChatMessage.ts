import ollama from "ollama";

// Define the response type
export interface ChatResponse {
  message: string;
  error?: string;
}

// Define message type for better type safety
export interface ChatMessage {
  content: string;
  role: "assistant" | "user";
}

// Store chat history
let chatHistory: ChatMessage[] = [];

export const getChatMessage = async (
  userMessage: string,
  onChunk: (chunk: string) => void
): Promise<ChatResponse> => {
  try {
    // Add user message to history
    chatHistory.push({
      content: userMessage,
      role: "user",
    });

    const messages = chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await ollama.chat({
      model: "llama3.2:latest",
      messages: messages,
      stream: true,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    });

    let fullResponse = "";

    for await (const chunk of response) {
      if (chunk.message?.content) {
        fullResponse += chunk.message.content;
        onChunk(chunk.message.content);
      }
    }

    // Add complete response to chat history
    chatHistory.push({
      content: fullResponse,
      role: "assistant",
    });

    return {
      message: fullResponse,
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

// Helper function to clear chat history
export const clearChatHistory = (): void => {
  chatHistory = [];
};

// Helper function to get current chat history
export const getChatHistory = (): ChatMessage[] => {
  return [...chatHistory];
};
