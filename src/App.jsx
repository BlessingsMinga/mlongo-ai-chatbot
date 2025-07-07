import { useState } from "react";
import styles from "./App.module.css";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";
import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

const gemini = googleai.getClient({ model: "gemini-1.5-flash" });
const chat = gemini.startChat({ history: [] });

function App() {
  const [messages, setMessages] = useState([]);

  function handleContentSend(content) {
    if (!content.trim()) return;  // Don't add empty messages
    
    // Add user message
    const newUserMessage = {
      role: "user",
      content: content
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
  }

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img 
          className={styles.Logo} 
          src="/assets/chat-bot.png" 
          alt="Chat-bot icon" 
        />
        <h2 className={styles.Title}>Mlongo AI Bot</h2>
      </header>
      
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;