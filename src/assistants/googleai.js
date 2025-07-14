import { useState } from "react";
import styles from "./App.module.css";
import { Loader } from "./component/Loader/Loader";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with API key from environment variables
const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

// Get the Gemini model client
const gemini = googleai.getGenerativeModel({ model: "gemini-1.5-flash" });
// Start a new chat session
const chat = gemini.startChat({ history: [] });

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function updateLastMessageContent(content) {
    setMessages(prevMessages => 
      prevMessages.map((message, index) => 
        index === prevMessages.length - 1 
          ? { ...message, content: `${message.content}${content}` } 
          : message
      )
    );
  }

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
      const result = await chat.chatStream(content);
      let isFirstChunk = true;

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        
        if (isFirstChunk) {
          isFirstChunk = false;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true); // Hide loader after first chunk
        } 
        
        updateLastMessageContent(chunkText);
      }

      setIsStreaming(false); // Hide streaming state after completion
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      addMessage({
        content: "Pepani, yesani kachikena",
        role: "system"
      });

      setIsLoading(false); // Hide loader on error
      setIsStreaming(false); // Hide streaming state on error
    }
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
        {/* Position loader absolutely within ChatContainer */}
        {(isLoading || isStreaming) && (
          <div className={styles.LoaderOverlay}>
            <Loader />
          </div>
        )}
      </div>
      
      <Controls 
        isDisabled={isLoading || isStreaming} 
        onSend={handleContentSend}
      />
    </div>
  );
}

export default App;