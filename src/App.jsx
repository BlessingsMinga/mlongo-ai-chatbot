import { useState } from "react";
import styles from "./App.module.css";
import { Loader } from "./component/Loader/Loader";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";
import { Assistant } from "./component/Assistant/Assistant";


let assistant;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(
        content,
        messages.filter(({ role }) => role !== "system")
      );

      let isFirstChunk = false;
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }

        updateLastMessageContent(chunk);
      }

      setIsStreaming(false);
    } catch (error) {
      addMessage({
        content:
          error?.message ??
          "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  function handleAssistantChange(newAssistant) {
    assistant = newAssistant;
    
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