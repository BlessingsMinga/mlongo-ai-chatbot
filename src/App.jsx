import { useState, useMemo } from "react";
import styles from "./App.module.css";

import { Chat } from "./component/Chat/Chat";
import { Assistant } from "./component/Assistant/Assistant";
import { Theme } from "./component/Theme/Theme";
import Sidebar from "./component/Sidebar/Sidebar";

const CHATS = [
  { 
    id: 1,
    title: "How to use the API applications",
    messages: [
      { role: "user", content: "Kodi nthawi ili bwanji?" },
      { role: "assistant", content: "Zikomo" }
    ]
  },
  { 
    id: 2,
    title: "Gemini Vs ChatGPT",
    messages: [
      { role: "user", content: "Kodi nthawi ili bwanji?" },
      { role: "assistant", content: "Zikomo" }
    ]
  }
];

function App() {
  const [assistant, setAssistant] = useState(null);
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(2);

  const activeChatMessages = useMemo(() => {
    return chats.find(({ id }) => id === activeChatId)?.messages ?? [];
  }, [chats, activeChatId]);

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  return (
    <div className={styles.App}>
      {/* Header */}
      <header className={styles.header}>
        <img
          className={styles.Logo}
          src="/assets/chat-bot.png"
          alt="Chat-bot icon"
        />
        <h2 className={styles.Title}>Mlongo AI Bot</h2>
      </header>

      {/* Main Content */}
      <div className={styles.Content}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onActiveChatIdChange={setActiveChatId}
        />

        <main className={styles.Main}>
          <Chat
            assistant={assistant}
            chatId={activeChatId}
            chatMessages={activeChatMessages}
          />

          <div className={styles.Config}>
            <Assistant onAssistantChange={handleAssistantChange} />
            <Theme />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
