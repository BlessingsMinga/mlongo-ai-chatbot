import React, { useEffect, useRef, useState } from "react";
import styles from './Controls.module.css';

const Controls = ({ isDisabled = false, onSend }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleContentChange = (event) => {
    if (!isDisabled) {
      setContent(event.target.value);
      // Auto-resize textarea based on content
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  useEffect(() => { 
    if (!isDisabled) {
      textareaRef.current?.focus();
    }
  }, [isDisabled]);

  const handleContentSend = () => {
    if (isDisabled) return;
    
    const trimmedContent = content.trim();
    if (trimmedContent.length > 0) {
      onSend(trimmedContent);
      setContent("");
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !isDisabled) {
      event.preventDefault();
      handleContentSend();
    }
  };

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea
          ref={textareaRef}
          className={`${styles.TextArea} ${isDisabled ? styles.Disabled : ''}`}
          placeholder="Funsani Mlongo..."
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isDisabled}
          aria-label="Type your message"
          aria-disabled={isDisabled}
        />
      </div>
      <button 
        className={`${styles.Button} ${
          !content.trim() || isDisabled ? styles.Disabled : ''
        }`}
        onClick={handleContentSend}
        disabled={!content.trim() || isDisabled}
        aria-label="Send message"
        aria-disabled={!content.trim() || isDisabled}
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