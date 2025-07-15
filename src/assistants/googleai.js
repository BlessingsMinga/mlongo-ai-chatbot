import { GoogleGenAI } from '@google/genai';

// Initialize Google Generative AI
const googleai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
});

export class Assistant {
  #chat;

  constructor(model = "gemini-1.5-flash") {
    // Initialize chat session
    this.#chat = googleai.chats.create({ model });
  }

  async chat(content) {
    try {
      const result = await this.#chat.sendMessage({ 
        message: content 
      });
      return result.text();
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  }

  async *chatStream(content) {
    try {
      const result = await this.#chat.sendMessage({ 
        message: content 
      });

      // Assuming the package supports streaming this way
      for await (const chunk of result.stream()) {
        yield chunk.text();
      }
    } catch (error) {
      console.error("Stream error:", error);
      throw error;
    }
  }
}