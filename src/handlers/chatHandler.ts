import { createMessageContainer, createErrorMessage } from "../utils/uiUtils";

export class ChatHandler {
  private currentResponseDiv: HTMLDivElement | null = null;

  constructor(private chatContainer: Element | null) {}

  private createMessageElement(
    content: string,
    isUser: boolean,
    imageBase64?: string
  ): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "flex items-start space-x-2 mb-4";

    const messageDiv = document.createElement("div");
    messageDiv.className = isUser
      ? "ml-auto bg-blue-600 text-white max-w-2xl rounded-lg px-4 py-2"
      : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 max-w-2xl rounded-lg px-4 py-2";

    if (imageBase64) {
      const img = document.createElement("img");
      img.src = imageBase64;
      img.alt = "User uploaded image";
      img.className = "max-w-sm rounded mb-2";
      messageDiv.appendChild(img);
    }

    const textDiv = document.createElement("div");
    textDiv.textContent = content;
    messageDiv.appendChild(textDiv);
    container.appendChild(messageDiv);

    return container;
  }

  addMessage(
    message: string,
    isUser: boolean,
    imageBase64?: string,
    isStream: boolean = false
  ) {
    if (isStream && this.currentResponseDiv) {
      this.currentResponseDiv.textContent =
        (this.currentResponseDiv.textContent || "") + message;
      return;
    }

    const { containerDiv, textDiv } = createMessageContainer(
      isUser,
      imageBase64
    );
    textDiv.textContent = message;
    this.chatContainer?.appendChild(containerDiv);

    if (!isUser) {
      this.currentResponseDiv = textDiv;
    }

    this.scrollToBottom();
  }

  addErrorMessage(errorMessage: string) {
    const errorDiv = createErrorMessage(errorMessage);
    this.chatContainer?.appendChild(errorDiv);
    this.scrollToBottom();
  }

  resetResponseDiv() {
    this.currentResponseDiv = null;
  }

  private scrollToBottom() {
    this.chatContainer?.scrollTo({
      top: this.chatContainer.scrollHeight,
      behavior: "smooth",
    });
  }
}
