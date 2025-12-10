import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
  #model;
  #chat;
  name = "googleai";

  constructor(model = "gemini-2.5-flash") {
    this.#model = model;
  }

  // Create a new chat session with optional history
  createChat(history = []) {
    const model = genAI.getGenerativeModel({ model: this.#model });

    // Process and sanitize history
    const chatHistory = history
      .filter(({ role, content }) => role !== "system" && content && content.trim() !== "")
      .map(({ content, role }) => ({
        role: role === "assistant" ? "model" : role,
        content: { parts: [content] }, // Gemini requires 'parts' array
      }));

    try {
      this.#chat = model.startChat({ history: chatHistory });
    } catch (err) {
      console.error("Failed to create chat, starting empty chat:", err);
      this.#chat = model.startChat(); // fallback: empty chat
    }
  }

  // Send a single message and get full response
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

  // Stream response chunk by chunk
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
