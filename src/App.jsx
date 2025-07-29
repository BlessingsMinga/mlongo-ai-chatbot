import { useState, useCallback } from "react";
import styles from "./App.module.css";
import { Loader } from "./component/Loader/Loader";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";
import { Assistant } from "./component/Assistant/Assistant";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState(null);

  const updateLastMessageContent = useCallback((content) => {
    setMessages(prevMessages => 
      prevMessages.map((message, index) => 
        index === prevMessages.length - 1 
          ? { ...message, content: `${message.content}${content}` } 
          : message
      )
    );
  }, []);

  const addMessage = useCallback((newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  const handleContentSend = useCallback(async (content) => {
    if (!content.trim()) return;
    
    if (!currentAssistant) {
      addMessage({
        content: "Please select an assistant first",
        role: "system"
      });
      return;
    }

    setIsLoading(true);
    addMessage({ role: "user", content });
    addMessage({ content: "", role: "assistant" });

    try {
      const response = await currentAssistant.chat(content);
      
      setIsLoading(false);
      setIsStreaming(true);
      updateLastMessageContent(response);
      setIsStreaming(false);
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        content: "Pepani, yesani kachikena",
        role: "system"
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [currentAssistant, addMessage, updateLastMessageContent]);

  const handleAssistantChange = useCallback((newAssistant) => {
    // Only update if the assistant actually changed
    setCurrentAssistant(prev => 
      prev?.id === newAssistant?.id ? prev : newAssistant
    );
  }, []);

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
        {isLoading && (
          <div className={styles.LoaderOverlay}>
            <Loader />
          </div>
        )}
      </div>
      
      <Controls 
        isDisabled={isLoading || isStreaming} 
        onSend={handleContentSend}
      />

      <Assistant onAssistantChange={handleAssistantChange} />
    </div>
  );
}

export default App;