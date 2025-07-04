import { useState } from "react";
import styles from "./App.module.css";
import Chat from "./component/Chat/Chat";
import Controls from "./component/Controls/Controls";

function App() {

const [messages, setMessages] = useState([]); 
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img className={styles.Logo} src="/assets/chat-bot.png" alt="Chat-bot icon" />
        <h2 className={styles.Title}>Mlongo AI Bot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </div>
      <Controls />
      
    </div>
  );
}

export default App;
