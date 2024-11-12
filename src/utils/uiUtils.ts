// utils/uiUtils.ts
export function createMessageContainer(isUser: boolean, imageBase64?: string) {
  const div = document.createElement("div");
  div.className = "flex items-start space-x-2 mb-4";

  const messageDiv = document.createElement("div");
  messageDiv.className = isUser
    ? "ml-auto max-w-2xl rounded-lg px-4 py-2 bg-blue-600 text-white"
    : "max-w-2xl rounded-lg px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100";

  const contentDiv = document.createElement("div");
  contentDiv.className = "flex flex-col gap-2";

  if (imageBase64) {
    const img = document.createElement("img");
    img.src = imageBase64;
    img.alt = "User uploaded image";
    img.className = "max-w-sm rounded-lg";
    contentDiv.appendChild(img);
  }

  const textDiv = document.createElement("div");
  contentDiv.appendChild(textDiv);

  messageDiv.appendChild(contentDiv);
  div.appendChild(messageDiv);

  return { containerDiv: div, textDiv, messageDiv };
}

export function createErrorMessage(errorMessage: string) {
  const div = document.createElement("div");
  div.className = "flex items-start space-x-2 mb-4";

  const errorDiv = document.createElement("div");
  errorDiv.className = "max-w-2xl rounded-lg px-4 py-2 bg-red-100 text-red-800";
  errorDiv.textContent = errorMessage;

  div.appendChild(errorDiv);
  return div;
}
