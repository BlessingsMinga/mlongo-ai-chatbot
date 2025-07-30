import { useEffect, useState } from "react";
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

    function handleValueChange(event) {
        setValue(event.target.value);
    }

    useEffect(() => {
        const AssistantClass = assistantMap[value];
        if (!AssistantClass) {
            throw new Error(`Assistant wanu sakupezeka: ${value}`);
        }

        onAssistantChange(new AssistantClass());
    }, [value]);

    return (
        <div className={styles.Assistant}>
            <span>Assistant:</span>
            <select defaultValue={value} onChange={handleValueChange}>
                {/* <option value="deepseekai">DeepSeek AI</option> */}
                <option value="deepseekaiopenrouter">DeepSeek AI</option>
                <option value="googleai">Google AI</option>
                <option value="openai">OpenAI</option>
            </select>
        </div>
    );
}

