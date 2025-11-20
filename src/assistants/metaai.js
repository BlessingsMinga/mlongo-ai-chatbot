import OpenAI from "openai";
import { Assistant as openaiAssistant } from "../assistants/openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_META_AI_API_KEY,
    dangerouslyAllowBrowser: true,  // Note: Be cautious with this in production
});

export class Assistant extends openaiAssistant {
 
    constructor(model = "nousresearch/hermes-3-llama-3.1-405b:free", client = openai) {
         super(model, client);
    }
}









