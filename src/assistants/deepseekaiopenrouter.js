import OpenAI from "openai";
import { Assistant as openaiAssistant } from "../assistants/openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_DEEPSEEK_API_OPEN_ROUTER_API_KEY,
    dangerouslyAllowBrowser: true,  // Note: Be cautious with this in production
});

export class Assistant extends openaiAssistant {
 
    constructor(model = "tngtech/deepseek-r1t2-chimera:free", client = openai) {
         super(model, client);
    }
}









