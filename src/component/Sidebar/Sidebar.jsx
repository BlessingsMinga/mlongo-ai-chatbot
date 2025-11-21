import React from 'react';
import styles from './Sidebar.module.css';

const CHATS = [
  {
    id: 1,
    title: "How to use the API applications",
  },
  {
    id: 2,
    title: "Gemini Vs ChatGPT",
  },
];

const Sidebar = ({ chats = CHATS, activeChatId = 1 }) => {
  return (
    <div className={styles.Sidebar}>
      <ul className={styles.Chats}>
        {chats.map((chat) => (
          <li key={chat.id} className={styles.chat} data-active={chat.id === activeChatId}>
            <button className={styles.ChatButton}>
              <div className={styles.ChatTitle}>
                {chat.title}
              </div>
              
            </button>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
