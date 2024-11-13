import { describe, it, expect } from "vitest";
import {
  createMessageContainer,
  createErrorMessage,
} from "../../utils/uiUtils";

describe("uiUtils", () => {
  describe("createMessageContainer", () => {
    it("should create user message container", () => {
      const { containerDiv, textDiv, messageDiv } =
        createMessageContainer(true);

      expect(containerDiv.className).toContain("flex items-start");
      expect(messageDiv.className).toContain("bg-blue-600");
      expect(textDiv).toBeTruthy();
    });

    it("should create bot message container", () => {
      const { containerDiv, textDiv, messageDiv } =
        createMessageContainer(false);

      expect(containerDiv.className).toContain("flex items-start");
      expect(messageDiv.className).toContain("bg-white");
      expect(textDiv).toBeTruthy();
    });

    it("should include image when provided", () => {
      const imageBase64 = "data:image/jpeg;base64,test123";
      const { messageDiv } = createMessageContainer(true, imageBase64);

      const img = messageDiv.querySelector("img");
      expect(img).toBeTruthy();
      expect(img?.src).toBe(imageBase64);
    });
  });

  describe("createErrorMessage", () => {
    it("should create error message element", () => {
      const errorMessage = "Test error";
      const errorDiv = createErrorMessage(errorMessage);

      expect(errorDiv.className).toContain("flex items-start");
      expect(errorDiv.textContent).toBe(errorMessage);
      expect(errorDiv.querySelector("div")?.className).toContain("bg-red-100");
    });
  });
});
