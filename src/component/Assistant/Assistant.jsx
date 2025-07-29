import { useEffect, useState, useCallback } from "react";
import { Assistant as OpenRouterAIAssistant } from "../../assistants/deepseekaiopenrouter";
import { Assistant as DeepSeekAIAssistant } from "../../assistants/deepseekai";
import { Assistant as OpenAIAssistant } from "../../assistants/openai";
import { Assistant as GoogleAIAssistant } from "../../assistants/googleai";
import styles from "./Assistant.module.css";

const assistantMap = {
    deepseekaiopenrouter: OpenRouterAIAssistant,
    deepseekai: DeepSeekAIAssistant,
    openai: OpenAIAssistant,
    googleai: GoogleAIAssistant
};

export function Assistant({ onAssistantChange }) {
    const [value, setValue] = useState("deepseekaiopenrouter");
    const [currentAssistant, setCurrentAssistant] = useState(null);

    const handleValueChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    useEffect(() => {
        const AssistantClass = assistantMap[value];
        if (!AssistantClass) {
            throw new Error(`Unsupported assistant type: ${value}`);
        }

        const newAssistant = new AssistantClass();
        
        // Only update if the assistant actually changed
        if (!currentAssistant || newAssistant.id !== currentAssistant.id) {
            setCurrentAssistant(newAssistant);
            if (typeof onAssistantChange === 'function') {
                onAssistantChange(newAssistant);
            }
        }
    }, [value, currentAssistant, onAssistantChange]);

    return (
        <div className={styles.Assistant}>
            <span>Assistant:</span>
            <select 
                value={value} 
                onChange={handleValueChange}
            >
                <option value="deepseekai">DeepSeek AI</option>
                <option value="deepseekaiopenrouter">OpenRouter AI</option>
                <option value="googleai">Google AI</option>
                <option value="openai">OpenAI</option>
            </select>
        </div>
    );
}