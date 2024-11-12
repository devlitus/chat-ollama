import { createMessageContainer, createErrorMessage } from "../utils/uiUtils";

export class ChatHandler {
  private currentResponseDiv: HTMLDivElement | null = null;

  constructor(private chatContainer: Element | null) {}

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
