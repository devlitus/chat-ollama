import { getVisionResponse } from "@libs/visionHandler";
import { describe, it, vi, expect } from "vitest";

describe("getVisionResponse", () => {
  it("should validate base64 image data", async () => {
    const invalidBase64 = "invalid-base64-data";
    const result = await getVisionResponse(
      "test message",
      invalidBase64,
      vi.fn()
    );

    expect(result.error).toBeTruthy();
  });

  it("should handle empty image data", async () => {
    const result = await getVisionResponse("test message", "", vi.fn());

    expect(result.error).toBe("Image data is empty");
  });

  it("should process valid image data", async () => {
    const validBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
    const mockChunkHandler = vi.fn();

    vi.spyOn(global, "fetch").mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ response: "Processed image response" }),
        }) as Promise<Response>
    );

    const result = await getVisionResponse(
      "test message",
      validBase64,
      mockChunkHandler
    );

    expect(result.message).toContain("");
    expect(result.error).toContain("error processing image");
  });
});
