import ollama from "ollama";

export interface VisionResponse {
  message: string;
  error?: string;
}

function isValidBase64(str: string): boolean {
  if (!str || str.trim().length === 0) return false;
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(str);
}

export const getVisionResponse = async (
  userMessage: string,
  imageBase64: string,
  onChunk: (chunk: string) => void
): Promise<VisionResponse> => {
  try {
    if (!imageBase64) {
      throw new Error("Image data is empty");
    }
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    if (!isValidBase64(cleanBase64)) {
      throw new Error("Invalid base64 image data");
    }

    const res = await ollama.generate({
      model: "llama3.2-vision:latest",
      prompt: `${userMessage} respon siempre en castellano.`,
      images: [cleanBase64],
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of res) {
      if (chunk.response) {
        fullResponse += chunk.response;
        onChunk(chunk.response);
      }
    }

    return {
      message: fullResponse,
      error: undefined,
    };
  } catch (error) {
    console.error("Error in vision completion:", error);
    return {
      message: "",
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while processing your image",
    };
  }
};
