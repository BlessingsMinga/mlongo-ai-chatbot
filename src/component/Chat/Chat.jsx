import { useState, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import Messages from "../Messages/Messages";
import Controls from "../Controls/Controls";
import styles from "./Chat.module.css";


export function Chat({ 
  assistant, 
  chatId, 
  chatMessages, 
  onChatMessagesUpdate,
  isActive = false,
}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

 
  useEffect(() => {
    
    setMessages(chatMessages);

    if (assistant?.name === "googleai") {
      assistant.createChat(chatMessages);
    }
    
  }, [chatId]);

  useEffect(() =>{
    onChatMessagesUpdate(chatId, messages);
  }, [messages]);


  function updateLastMessageContent(content) {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: message.content + content }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    if (!assistant) {
      addMessage({
        role: "system",
        content: "Chonde sankhani wothandizira koyamba",
      });
      return;
    }

    addMessage({ content, role: "user" });
    setIsLoading(true);

    try {
      const result = await assistant.chatStream(
        content,
        messages.filter(({ role }) => role !== "system")
      );

      let isFirstChunk = true;

      for await (const chunk of result) {
        if (isFirstChunk) {
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
          isFirstChunk = false;
        }

        updateLastMessageContent(chunk);
      }

      setIsStreaming(false);
    } catch (error) {
      addMessage({
        content:
          error?.message ??
          "Pepani, sindinathe kukonza pempho lanu. Chonde yesaninso!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  if (!isActive) return null;

  return (
    <>
      {isLoading && (
        <div className={styles.LoaderOverlay}>
          <Loader />
        </div>
      )}

      <div className={styles.ChatContainer}>
        <Messages messages={messages} />
      </div>

      <Controls
        isDisabled={isLoading || isStreaming}
        onSend={handleContentSend}
      />
    </>
  );
}
