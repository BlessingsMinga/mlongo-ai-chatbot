import OpenAI from "openai";
import { Assistant as openaiAssistant } from "../assistants/openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
    dangerouslyAllowBrowser: true,  // Note: Be cautious with this in production
});

export class Assistant extends openaiAssistant {
 
    constructor(model = "deepseek-chat", client = openai) {
         super(model, client);
    }
}

