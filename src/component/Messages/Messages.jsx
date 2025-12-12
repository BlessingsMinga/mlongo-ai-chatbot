import React, { useEffect, useMemo, useRef } from 'react';
import styles from "./Messages.module.css";
import Markdown from 'react-markdown';

const WELCOME_MESSAGE_GROUP = [
  {
    role: "assistant",
    content: "Takulandilani! Ndine Mlongo AI Bot. Kodi mungandifunse chiyani?",
  },
];

const Messages = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);

  // Group messages by conversation turns (user + assistant pairs)
  const messagesGroups = useMemo(() => {
    return messages.reduce((groups, message) => {
      if (message.role === 'user' || groups.length === 0) {
        groups.push([]);
      }
      groups[groups.length - 1].push(message);
      return groups;
    }, []);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    });
  }, [messages]);

  return (
    <div className={styles.Messages}>
      {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map((group, groupIndex) => (
        <div key={groupIndex} className={styles.Group}>
          {group.map(({ role, content }, index) => (
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
                  <div className={styles.Markdown}> 
                  <Markdown >{content}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;