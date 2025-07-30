import OpenAI from "openai";
import { Assistant as openaiAssistant } from "../assistants/openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_META_AI_API_KEY,
    dangerouslyAllowBrowser: true,  // Note: Be cautious with this in production
});

export class Assistant extends openaiAssistant {
 
    constructor(model = "meta-llama/llama-3.1-8b-instruct", client = openai) {
         super(model, client);
    }
}









