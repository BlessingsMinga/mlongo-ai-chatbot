import { useState } from "react";
import styles from "./Assistant.module.css";

export function Assistant() {
    const [value, setValue] = useState("deepseekaiopenrouter");

    function handleValueChange(event) {
        setValue(event.target.value);
    }

    return (
        <div className={styles.Assistant}>
            <span>Assistant:</span>
            <select 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="deepseekai">DeepSeek AI</option>
                <option value="deepseekaiopenrouter">OpenRouter AI</option>
                <option value="googleai">Google AI</option>
                <option value="openai">OpenAI</option>
            </select>
        </div>
    );
}