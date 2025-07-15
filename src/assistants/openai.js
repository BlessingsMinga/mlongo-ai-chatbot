import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,  // Note: Be cautious with this in production
});

export class Assistant {
    #model;
    #client;
    
    constructor(model = "gpt-3.5-turbo", client = openai) { 
        this.#client = client // Changed default to "gpt-4" as "gpt-4o-mini" doesn't exist
        this.#model = model;
    }

    async chat(content, history = []) {
        try {
            const result = await this.#client.chat.completions.create({
                model: this.#model,
                messages: [
                    ...history,
                    { content, role: "user" }
                ],
            });

            if (!result.choices?.[0]?.message?.content) {
                throw new Error("No response content from OpenAI");
            }

            return result.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API error:", error);
            throw error;  // Re-throw to let calling code handle it
        }
    }

    async *chatStream(content, history = []) {
        try {
            const result = await openai.chat.completions.create({
                model: this.#model,
                messages: [
                    ...history,
                    { content, role: "user" }
                ], 
                stream: true,
            });

            if (!result.choices?.[0]?.message?.content) {
                throw new Error("No response content from OpenAI");
            }

            for await (const chunk of result) {
               yield chunk.choices[0].delta.content || "";
            }
        } catch (error) {
            console.error("OpenAI API error:", error);
            throw error;  // Re-throw to let calling code handle it
        }
    }
}