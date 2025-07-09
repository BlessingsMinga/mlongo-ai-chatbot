import { useState } from "react";
import styles from "./App.module.css";
import { Loader } from "./component/Loader/Loader";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Assistant } from "./assistants/openai";




// Initialize Google Generative AI with API key from environment variables
const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

// Get the Gemini model client
const gemini = googleai.getGenerativeModel({ model: "gemini-1.5-flash" });
// Start a new chat session
const chat = gemini.startChat({ history: [] });

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(newMessage) {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }

  async function handleContentSend(content) {
    if (!content.trim()) return; // Don't add empty messages
    setIsLoading(true); // Show loader while processing

    // Add user message
    const newUserMessage = {
      role: "user",
      content: content
    };

    addMessage(newUserMessage);

    try {
      // Send message to Gemini and get response
      const result = await chat.sendMessage(content, messages);
      const response = result.response;
      const text = response.text();

      // Add assistant's response
      addMessage({
        content: text,
        role: "assistant"
      });

    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      addMessage({
        content: "Pepani, yesani kachikena",
        role: "system"
      });
    } finally {
      setIsLoading(false); // Hide loader after processing
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />} 
      
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