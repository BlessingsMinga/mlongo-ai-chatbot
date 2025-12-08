import { useState, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import Messages from "../Messages/Messages";
import Controls from "../Controls/Controls";
import styles from "./Chat.module.css";

export function Chat({ assistant, chatId, chatMessages }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Load messages whenever chat changes
  useEffect(() => {
    setMessages(chatMessages);
  }, [chatId, chatMessages]);

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
        content: "Please select an assistant first.",
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
          "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

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
