import { describe, it, expect, beforeEach, vi } from "vitest";
import { ImagePreviewManager } from "../../utils/imagePreview";

describe("ImagePreviewManager", () => {
  let imagePreviewManager: ImagePreviewManager;
  let mockOnRemove: () => void;

  beforeEach(() => {
    // Setup DOM environment
    document.body.innerHTML = `
      <div class="preview-container"></div>
    `;
    mockOnRemove = vi.fn();
    imagePreviewManager = new ImagePreviewManager(mockOnRemove);
  });

  it("should create image preview", () => {
    const base64Image = "data:image/jpeg;base64,test123";
    imagePreviewManager.createPreview(base64Image);

    const previewContainer = document.querySelector(".preview-container");
    const previewImage = previewContainer?.querySelector("img");

    expect(previewImage).toBeTruthy();
    expect(previewImage?.src).toBe(base64Image);
    expect(previewImage?.alt).toBe("Preview");
  });

  it("should remove preview when remove button is clicked", () => {
    const base64Image = "data:image/jpeg;base64,test123";
    imagePreviewManager.createPreview(base64Image);

    const removeButton = document.querySelector("button");
    removeButton?.click();

    const previewContainer = document.querySelector(".preview-container");
    const previewImage = previewContainer?.querySelector("img");

    expect(previewImage).toBeFalsy();
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
