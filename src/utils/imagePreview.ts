// utils/imagePreview.ts
export class ImagePreviewManager {
  private imagePreviewContainer: HTMLDivElement | null = null;
  private formContainer: Element | null;

  constructor(private onRemove: () => void) {
    this.formContainer = document.querySelector(".preview-container");
    if (this.formContainer) {
      (this.formContainer as HTMLElement).style.position = "relative";
    }
  }

  createPreview(imageBase64: string) {
    this.removePreview();

    this.imagePreviewContainer = document.createElement("div");
    this.imagePreviewContainer.className =
      "absolute -top-20 left-14 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg flex items-center gap-2";

    const previewImg = document.createElement("img");
    previewImg.src = imageBase64;
    previewImg.alt = "Preview";
    previewImg.className = "h-18 w-16 object-cover rounded";

    const removeButton = this.createRemoveButton();

    this.imagePreviewContainer.appendChild(previewImg);
    this.imagePreviewContainer.appendChild(removeButton);

    this.formContainer?.appendChild(this.imagePreviewContainer);
  }

  private createRemoveButton() {
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className =
      "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200";
    removeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    `;

    removeButton.addEventListener("click", () => {
      this.removePreview();
      this.onRemove();
    });

    return removeButton;
  }

  removePreview() {
    if (this.imagePreviewContainer) {
      this.imagePreviewContainer.remove();
      this.imagePreviewContainer = null;
    }
  }
}
