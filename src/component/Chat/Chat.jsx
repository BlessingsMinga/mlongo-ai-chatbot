import React from 'react';
import styles from "./Chat.module.css";
import Markdown from 'react-markdown';

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Takulandilani! Ndine Mlongo AI Bot. Kodi mungandifunse chiyani?"
};

const Chat = ({ messages = [] }) => {
  // Combine welcome message with conversation history
  const allMessages = [WELCOME_MESSAGE, ...messages];

  return (
    <div className={styles.Chat}>
      {allMessages.map(({ role, content }, index) => (
        <div 
          key={`${role}-${index}`} 
          className={`${styles.Message} ${styles[`Message--${role}`]}`}
          data-role={role}
        >
          <div className={styles.MessageContent}>
            {role === 'assistant' && (
              <div className={styles.Avatar}>
                <img 
                  src="/assets/chat-bot.png" 
                  alt="Mlongo AI Avatar"
                  width={32}
                  height={32}
                />
              </div>
            )}
            <div className={styles.Text}>
              <Markdown>
                {content}
              </Markdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;