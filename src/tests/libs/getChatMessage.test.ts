import {
  clearChatHistory,
  getChatMessage,
  getChatHistory,
} from "@libs/getChatMessage";
import { describe, beforeEach, it, vi, expect } from "vitest";

describe("getChatMessage", () => {
  beforeEach(() => {
    clearChatHistory();
  });

  it("should handle chat message and update history", async () => {
    const mockResponse = { message: { content: "response" } };
    vi.spyOn(global, "fetch").mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        }) as Promise<Response>
    );

    const mockChunkHandler = vi.fn();
    await getChatMessage("test message", mockChunkHandler);

    const history = getChatHistory();
    expect(history).toHaveLength(2);
    expect(history[0].content).toBe("test message");
    expect(history[0].role).toBe("user");
  });
});
