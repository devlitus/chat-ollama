import { ImageHandler } from "../../handlers/imageHandler";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";

describe("ImageHandler", () => {
  let imageHandler: ImageHandler;
  let mockFileInput: HTMLInputElement;
  let mockOnError: vi.Mock;

  beforeEach(() => {
    document.body.innerHTML = '<div class="preview-container"></div>';
    mockFileInput = document.createElement("input");
    mockOnError = vi.fn();
    imageHandler = new ImageHandler(mockFileInput, mockOnError);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should handle valid image upload", async () => {
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const event = { target: { files: [file] } } as unknown as Event;

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: "data:image/jpeg;base64,test123",
      onloadend: null as any,
    };

    global.FileReader = vi.fn(() => mockFileReader) as any;

    imageHandler.handleImageUpload(event);
    mockFileReader.onloadend();

    expect(imageHandler.getCurrentImage()).toBe(mockFileReader.result);
  });

  it("should handle invalid file type", () => {
    const file = new File(["test"], "test.txt", { type: "text/plain" });
    const event = { target: { files: [file] } } as unknown as Event;

    imageHandler.handleImageUpload(event);

    expect(mockOnError).toHaveBeenCalledWith(
      "Please upload a valid image file"
    );
  });

  it("should clear image", () => {
    imageHandler.clearImage();

    expect(imageHandler.getCurrentImage()).toBeUndefined();
    expect(mockFileInput.value).toBe("");
  });
});
