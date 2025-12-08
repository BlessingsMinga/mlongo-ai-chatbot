import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";



export default function Sidebar({ chats, activeChatId, onActiveChatIdChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarToggle = () => setIsOpen((s) => !s);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);


  function handleChatClick (chatId) {
    onActiveChatIdChange(chatId);

    if (isOpen) {
      setIsOpen(false);
    }

  }

  return (
    <>
      <button
        className={styles.menuButton}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
        onClick={handleSidebarToggle}
      >
        <MenuIcon />
      </button>

      <aside
        className={styles.sidebar}
        data-open={isOpen ? "true" : "false"}
        aria-hidden={!isOpen}
      >
        <ul className={styles.chats}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={styles.chatItem}
              data-active={chat.id === activeChatId ? "true" : "false"}
            >
              <button
                className={styles.chatButton}
                onClick={() => handleChatClick(chat.id)}
              >
                <span className={styles.chatTitle}>{chat.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div
        className={styles.overlay}
        data-show={isOpen ? "true" : "false"}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      width="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}
