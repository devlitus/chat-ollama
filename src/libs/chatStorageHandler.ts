import type { ChatConversation, ChatMessage } from "../types/chat";

export class ChatStorageHandler {
  private readonly STORAGE_KEY = "chat_conversations";

  createNewConversation(): string {
    const conversations = this.getConversations();
    const id = crypto.randomUUID();

    const newConversation: ChatConversation = {
      id,
      title: "Nueva conversación",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    conversations.unshift(newConversation);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));

    return id;
  }

  saveConversation(messages: ChatMessage[]): string {
    const conversations = this.getConversations();
    const title = this.generateTitle(messages);
    const id = crypto.randomUUID();

    const newConversation: ChatConversation = {
      id,
      title,
      messages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    conversations.unshift(newConversation);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));

    return id;
  }

  updateConversationTitle(id: string, messages: ChatMessage[]) {
    const firstUserMessage = messages.find((msg) => msg.role === "user");
    if (!firstUserMessage) return;

    const title =
      firstUserMessage.content.length > 20
        ? firstUserMessage.content.substring(0, 20) + "..."
        : firstUserMessage.content;

    const conversations = this.getConversations();
    const index = conversations.findIndex((conv) => conv.id === id);

    if (index !== -1) {
      conversations[index].title = title;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));
    }
  }

  getConversations(): ChatConversation[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  getConversation(id: string): ChatConversation | undefined {
    return this.getConversations().find((conv) => conv.id === id);
  }

  updateConversation(id: string, messages: ChatMessage[]) {
    const conversations = this.getConversations();
    const index = conversations.findIndex((conv) => conv.id === id);

    if (index !== -1) {
      conversations[index] = {
        ...conversations[index],
        messages,
        title: this.generateTitle(messages),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));
    }
  }

  deleteConversation(id: string) {
    const conversations = this.getConversations().filter(
      (conv) => conv.id !== id
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));
  }

  clearConversations() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private generateTitle(messages: ChatMessage[]): string {
    const firstUserMessage = messages.find((msg) => msg.role === "user");
    if (!firstUserMessage) return "Nueva conversación";

    return firstUserMessage.content.length > 30
      ? firstUserMessage.content.substring(0, 30) + "..."
      : firstUserMessage.content;
  }
}
