import { initializeChatForm } from "../../libs/chatFormHandler";
import { describe, beforeEach, afterEach, vi, it, expect } from "vitest";

describe("ChatForm", () => {
  let cleanup: () => void;

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <input name="message" type="text" />
        <input name="image" type="file" />
        <button id="sendButton">Send</button>
        <div class="chat-messages"></div>
        <div class="preview-container"></div>
      </form>
    `;
    cleanup = initializeChatForm();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should initialize form with correct elements", () => {
    const form = document.querySelector("form");
    const messageInput = document.querySelector('input[name="message"]');
    const fileInput = document.querySelector('input[name="image"]');
    const sendButton = document.querySelector("#sendButton");

    expect(form).toBeTruthy();
    expect(messageInput).toBeTruthy();
    expect(fileInput).toBeTruthy();
    expect(sendButton).toBeTruthy();
  });

  it("should handle form submission", async () => {
    const messageInput = document.querySelector(
      'input[name="message"]'
    ) as HTMLInputElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const sendButton = document.querySelector(
      "#sendButton"
    ) as HTMLButtonElement;

    messageInput.value = "test message";
    form.dispatchEvent(new Event("submit"));

    expect(sendButton.disabled).toBe(true);
    expect(messageInput.value).toBe("test message");
  });

  it("should handle Enter key press", () => {
    const messageInput = document.querySelector(
      'input[name="message"]'
    ) as HTMLInputElement;
    const submitEvent = vi.fn();
    document.querySelector("form")?.addEventListener("submit", submitEvent);

    messageInput.value = "test message";
    messageInput.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));

    expect(submitEvent).toHaveBeenCalled();
  });
});
