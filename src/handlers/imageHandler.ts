// handlers/imageHandler.ts
import { ImagePreviewManager } from "../utils/imagePreview";

export class ImageHandler {
  private currentImageBase64: string | undefined;
  private previewManager: ImagePreviewManager;

  constructor(
    private fileInput: HTMLInputElement,
    private onError: (message: string) => void
  ) {
    this.previewManager = new ImagePreviewManager(() => {
      this.clearImage();
    });
  }

  handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      this.onError("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.currentImageBase64 = reader.result as string;
      this.previewManager.createPreview(this.currentImageBase64);
    };
    reader.onerror = () => {
      this.onError("Error reading the image file");
    };
    reader.readAsDataURL(file);
  }

  clearImage() {
    this.currentImageBase64 = undefined;
    this.fileInput.value = "";
  }

  getCurrentImage() {
    return this.currentImageBase64;
  }

  removePreview() {
    this.previewManager.removePreview();
  }
}
