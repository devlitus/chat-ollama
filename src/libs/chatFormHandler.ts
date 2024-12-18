import { getChatMessage } from "./getChatMessage";
import { getVisionResponse } from "./visionHandler";
import { ChatHandler } from "@handlers/chatHandler";
import { ImageHandler } from "@handlers/imageHandler";

export function initializeChatForm() {
  const form = document.querySelector("form");
  const chatContainer = document.querySelector(".chat-messages");
  const input = document.querySelector(
    'input[name="message"]'
  ) as HTMLInputElement;
  const fileInput = document.querySelector(
    'input[name="image"]'
  ) as HTMLInputElement;
  const sendButton = document.querySelector("#sendButton") as HTMLButtonElement;

  const chatHandler = new ChatHandler(chatContainer);
  const imageHandler = new ImageHandler(fileInput, (error) =>
    chatHandler.addErrorMessage(error)
  );

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const userMessage = input.value.trim();
    if (!userMessage) return;

    sendButton.disabled = true;

    chatHandler.resetResponseDiv();
    imageHandler.removePreview();

    const currentImage = imageHandler.getCurrentImage();
    chatHandler.addMessage(userMessage, true, currentImage);

    try {
      if (currentImage) {
        const streamResponse = await getVisionResponse(
          userMessage,
          currentImage,
          (chunk) => chatHandler.addMessage(chunk, false, undefined, true)
        );

        if (streamResponse.error) {
          throw new Error(streamResponse.error);
        }
      } else {
        const streamResponse = await getChatMessage(userMessage, (chunk) =>
          chatHandler.addMessage(chunk, false, undefined, true)
        );

        if (streamResponse.error) {
          throw new Error(streamResponse.error);
        }
      }

      input.value = "";
      imageHandler.clearImage();
    } catch (error) {
      console.error("Error:", error);
      chatHandler.addErrorMessage(
        "An error occurred while processing your message or image."
      );
    } finally {
      sendButton.disabled = false;
    }
  };

  form?.addEventListener("submit", handleSubmit);
  fileInput?.addEventListener("change", (e) =>
    imageHandler.handleImageUpload(e)
  );

  input?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form?.dispatchEvent(new Event("submit"));
    }
  });

  return () => {
    form?.removeEventListener("submit", handleSubmit);
    fileInput?.removeEventListener("change", () => {});
    input?.removeEventListener("keypress", () => {});
    imageHandler.removePreview();
  };
}
