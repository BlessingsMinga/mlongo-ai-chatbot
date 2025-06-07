import React from 'react'
import styles from "./Chat.module.css";

const Chat = ({messages}) => {
  return (
    <div className={styles.Chat}>
        {messages.map(({
            role, content}, index) => 
        (
            <div key={index} data-role={role} 
            className={styles.Message}>{content}</div>
        ))}
      
    </div>
  )
}

export default Chat
