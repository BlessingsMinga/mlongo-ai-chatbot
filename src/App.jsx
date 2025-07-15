import { useState } from "react";
import styles from "./App.module.css";
import { Loader } from "./component/Loader/Loader";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";
import { Assistant } from "./assistants/deepseekai";

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
      // Add assistant message placeholder
      addMessage({ content: "", role: "assistant" });
      
      // Initialize DeepSeek assistant
      const assistant = new Assistant();
      const response = await assistant.chat(content);
      
      setIsLoading(false);
      setIsStreaming(true);
      
      // Update message with the response
      updateLastMessageContent(response);
      
      setIsStreaming(false);

    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      addMessage({
        content: "Pepani, yesani kachikena",
        role: "system"
      });

      setIsLoading(false);
      setIsStreaming(false);
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
    </div>
  );
}

export default App;