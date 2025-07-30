import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,  // Only for development!
});

export class Assistant {
    #model;
    #client;
    
    constructor(model = "gpt-3.5-turbo", client = openai) { 
        this.#model = model;
        this.#client = client;
    }

    async chat(content, history = []) {
        try {
            const result = await this.#client.chat.completions.create({
                model: this.#model,
                messages: [
                    ...history,
                    { role: "user", content }
                ],
            });

            if (!result.choices?.[0]?.message?.content) {
                throw new Error("No response content from OpenAI");
            }

            return result.choices[0].message.content;
        } catch (error) {
            console.error("OpenAI API error:", error);
            throw error;
        }
    }

    async *chatStream(content, history = []) {
        try {
            const stream = await this.#client.chat.completions.create({
                model: this.#model,
                messages: [
                    ...history,
                    { role: "user", content }
                ],
                stream: true,
            });

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content;
                if (content !== undefined) {
                    yield content;
                }
            }
        } catch (error) {
            console.error("OpenAI API error:", error);
            throw error;
        }
    }
}