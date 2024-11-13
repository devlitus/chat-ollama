import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { ChatHandler } from "../../handlers/chatHandler";

describe("ChatHandler", () => {
  let chatHandler: ChatHandler;
  let mockChatContainer: HTMLElement;

  beforeEach(() => {
    mockChatContainer = document.createElement("div");
    mockChatContainer.scrollTo = vi.fn();
    chatHandler = new ChatHandler(mockChatContainer);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should add user message with image", () => {
    const imageBase64 = "data:image/jpeg;base64,test123";
    chatHandler.addMessage("Hello with image", true, imageBase64);

    const messageDiv = mockChatContainer.querySelector("div");
    const image = messageDiv?.querySelector("img");

    expect(messageDiv?.textContent).toBe("Hello with image");
    expect(image?.src).toBe(imageBase64);
    expect(image?.alt).toBe("User uploaded image");
  });

  it("should scroll to bottom when adding message", () => {
    chatHandler.addMessage("Test message", true);

    expect(mockChatContainer.scrollTo).toHaveBeenCalledWith({
      top: mockChatContainer.scrollHeight,
      behavior: "smooth",
    });
  });

  it("should handle consecutive streaming messages", () => {
    chatHandler.addMessage("First", false, undefined, true);
    chatHandler.addMessage(" Second", false, undefined, true);
    chatHandler.addMessage(" Third", false, undefined, true);

    const messageDiv = mockChatContainer.querySelector("div");
    expect(messageDiv?.textContent).toBe("First Second Third");
  });

  it("should reset response div", () => {
    chatHandler.addMessage("Initial message", false, undefined, true);
    chatHandler.resetResponseDiv();
    chatHandler.addMessage("New message", false, undefined, false);

    const messageDivs = mockChatContainer.querySelectorAll("div");
    expect(messageDivs.length).toBe(8);
  });
});
