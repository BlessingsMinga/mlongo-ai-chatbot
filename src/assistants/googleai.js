import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with API key from environment variables
const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

// Get the Gemini model client
const gemini = googleai.getGenerativeModel({ model: "gemini-1.5-flash" });


export class Assistant {

  #chat;

  constructor( model = "gemini-1.5-flash" ) {
    const gemini = googleai.getGenerativeModel({ model});
    // Start a new chat session
    this.#chat = gemini.startChat({ history: [] });

  }

  async chat(content) {
    try {

      const result = await chat.sendMessage();
      return result.response.text();
    } catch (error) {
      throw error;
    }
  }
}