import React, { useState } from "react";
import styles from './Controls.module.css';

const Controls = ({ onSend }) => {
  const [content, setContent] = useState("");

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    const trimmedContent = content.trim();
    if (trimmedContent.length > 0) {
      onSend(trimmedContent);
      setContent(""); // Clear the content after sending
    }
  }
  

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line on Enter key
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea
          className={styles.TextArea}
          placeholder="Funsani Mlongo..."
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
      </div>
      <button 
        className={styles.Button} 
        onClick={handleContentSend}
        disabled={!content.trim()} // Disable when empty
        aria-label="Send message"
      >
        <SendIcon />
      </button>
    </div>
  );
};

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#5f6368"
  >
    <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
  </svg>
);

export default Controls;