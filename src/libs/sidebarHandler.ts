// src/libs/sidebarHandler.ts

import type { ChatConversation, ChatMessage } from "../types/chat";
import { ChatStorageHandler } from "./chatStorageHandler";

export class SidebarHandler {
  private chatHistoryContainer: HTMLElement | null;
  private chatMessagesContainer: HTMLElement | null;
  private storage: ChatStorageHandler;
  private currentConversationId: string | null = null;

  constructor() {
    this.chatHistoryContainer = document.getElementById("chatHistory");
    this.chatMessagesContainer = document.querySelector(".chat-messages");
    this.storage = new ChatStorageHandler();

    this.initializeEventListeners();
    this.loadConversations();
    if (!this.currentConversationId) {
      this.handleNewChat();
    }
  }

  private initializeEventListeners() {
    document
      .getElementById("newChat")
      ?.addEventListener("click", () => this.handleNewChat());
    document
      .getElementById("clearAllChats")
      ?.addEventListener("click", () => this.handleClearAll());
    document
      .getElementById("settings")
      ?.addEventListener("click", () => this.handleSettings());
    document.addEventListener("chatUpdated", (e: Event) =>
      this.handleChatUpdate(e)
    );
    document.addEventListener("astro:unmount", () => this.cleanup());
  }

  private createChatHistoryItem(
    conversation: ChatConversation
  ): HTMLDivElement {
    const div = document.createElement("div");
    div.className = `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 ${
      conversation.id === this.currentConversationId
        ? "bg-gray-100 dark:bg-gray-700"
        : ""
    }`;

    const formattedDate = new Date(conversation.updatedAt).toLocaleString(
      "es",
      {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    div.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <div class="flex-1 min-w-0">
        <div class="truncate">${conversation.title}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">${formattedDate}</div>
      </div>
    `;

    div.addEventListener("click", () => this.loadConversation(conversation.id));
    return div;
  }

  private createMessageElement(message: ChatMessage): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "flex items-start space-x-2 mb-4";

    const messageDiv = document.createElement("div");
    messageDiv.className =
      message.role === "user"
        ? "ml-auto bg-blue-600 text-white max-w-2xl rounded-lg px-4 py-2"
        : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 max-w-2xl rounded-lg px-4 py-2";

    messageDiv.textContent = message.content;
    container.appendChild(messageDiv);

    return container;
  }

  private resetToInitialState() {
    if (this.chatMessagesContainer) {
      // Preservar el mensaje inicial de ChatMessage.astro
      const initialMessage = this.chatMessagesContainer.firstElementChild;
      this.chatMessagesContainer.innerHTML = "";
      if (initialMessage) {
        this.chatMessagesContainer.appendChild(initialMessage.cloneNode(true));
      }
    }
  }

  private loadConversations() {
    if (!this.chatHistoryContainer) return;

    this.chatHistoryContainer.innerHTML = "";
    const conversations = this.storage.getConversations();

    conversations.forEach((conversation) => {
      const item = this.createChatHistoryItem(conversation);
      this.chatHistoryContainer?.appendChild(item);
    });
  }

  private async loadConversation(id: string) {
    const conversation = this.storage.getConversation(id);
    if (!conversation || !this.chatMessagesContainer) return;

    this.currentConversationId = id;

    // Limpiar chat actual
    this.chatMessagesContainer.innerHTML = "";

    if (conversation.messages.length === 0) {
      // Si es una conversación nueva, mostrar solo el mensaje inicial
      const initialMessage = this.chatMessagesContainer.firstElementChild;
      if (initialMessage) {
        this.chatMessagesContainer.appendChild(initialMessage.cloneNode(true));
      }
    } else {
      // Recrear mensajes existentes
      conversation.messages.forEach((message) => {
        const messageElement = this.createMessageElement(message);
        this.chatMessagesContainer?.appendChild(messageElement);
      });
    }

    this.loadConversations();
  }

  private handleNewChat() {
    // Crear nueva conversación en localStorage
    this.currentConversationId = this.storage.createNewConversation();

    // Limpiar chat actual
    if (this.chatMessagesContainer) {
      const initialMessage = this.chatMessagesContainer.firstElementChild;
      this.chatMessagesContainer.innerHTML = "";
      if (initialMessage) {
        this.chatMessagesContainer.appendChild(initialMessage.cloneNode(true));
      }
    }

    this.loadConversations();
  }

  private handleClearAll() {
    this.storage.clearConversations();
    this.currentConversationId = null;
    this.resetToInitialState();
    this.loadConversations();
  }

  private handleChatUpdate(event: Event) {
    const customEvent = event as CustomEvent<{ messages: ChatMessage[] }>;
    if (!customEvent.detail?.messages) return;

    const messages = customEvent.detail.messages;

    // Si no hay conversación activa y el mensaje es del usuario, crear nueva conversación
    if (
      !this.currentConversationId &&
      messages.some((m) => m.role === "user")
    ) {
      this.currentConversationId = this.storage.createNewConversation();
    }

    if (this.currentConversationId) {
      this.storage.updateConversation(this.currentConversationId, messages);
      this.storage.updateConversationTitle(
        this.currentConversationId,
        messages
      );
    }

    this.loadConversations();
  }

  private handleSettings() {
    console.log("Settings clicked");
  }

  private cleanup() {
    document.getElementById("newChat")?.removeEventListener("click", () => {});
    document
      .getElementById("clearAllChats")
      ?.removeEventListener("click", () => {});
    document.getElementById("settings")?.removeEventListener("click", () => {});
    document.removeEventListener("chatUpdated", () => {});
  }
}
