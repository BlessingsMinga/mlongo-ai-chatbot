import React, { useState } from "react";
import styles from './Controls.module.css';

const Controls = ({ onSend }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (event) => {
    setContent(event.target.value);
    // Auto-resize textarea based on content
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleContentSend = () => {
    const trimmedContent = content.trim();
    if (trimmedContent.length > 0) {
      onSend(trimmedContent);
      setContent("");
      // Reset textarea height after sending
      const textarea = document.querySelector(`.${styles.TextArea}`);
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  };

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
          aria-label="Type your message"
        />
      </div>
      <button 
        className={`${styles.Button} ${!content.trim() ? styles.Disabled : ''}`}
        onClick={handleContentSend}
        disabled={!content.trim()}
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
    fill="currentColor"
  >
    <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
  </svg>
);

export default Controls;