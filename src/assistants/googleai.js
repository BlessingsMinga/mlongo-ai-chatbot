import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
  #model;
  #chat;

  constructor(model = "gemini-1.5-flash") {
    this.#model = model;
  }

  async chat(content) {
    try {
      if (!this.#chat) {
        const model = genAI.getGenerativeModel({ model: this.#model });
        this.#chat = model.startChat();
      }
      
      const result = await this.#chat.sendMessage(content);
      return result.response.text();
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    }
  }

  async *chatStream(content) {
    try {
      const model = genAI.getGenerativeModel({ model: this.#model });
      const chat = model.startChat();
      
      const result = await chat.sendMessageStream(content);

      for await (const chunk of result.stream) {
        yield chunk.text();
      }
    } catch (error) {
      console.error("Stream error:", error);
      throw error;
    }
  }
}