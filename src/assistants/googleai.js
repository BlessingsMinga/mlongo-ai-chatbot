import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with API key from environment variables
const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
    constructor() {
        this.chatSession = gemini.startChat({
            history: [
                {
                    role: "user",
                    parts: "Nthawi zonse yankhula mu Chichewa kokha. Osagwiritsa ntchito chinenero china chilichonse."
                },
                {
                    role: "model",
                    parts: "Ndikuvomereza, ndidzayankhula mu Chichewa kokha. Ndikuthandizeni bwanji?"
                }
            ]
        });
    }

    async chat(message) {
        const result = await this.chatSession.sendMessage(message);
        const response = await result.response;
        return response.text();
    }
}