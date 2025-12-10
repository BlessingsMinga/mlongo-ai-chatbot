import { useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from "./App.module.css";

import { Chat } from "./component/Chat/Chat";
import { Assistant } from "./component/Assistant/Assistant";
import { Theme } from "./component/Theme/Theme";
import Sidebar from "./component/Sidebar/Sidebar";

const CHATS = [
  { 
    id: "1",
    title: "How to use the API applications",
    messages: [
      { role: "user", content: "Kodi nthawi ili bwanji?" },
      { role: "assistant", content: "Zikomo" }
    ]
  },
  { 
    id: "2",
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
  const [activeChatId, setActiveChatId] = useState("2");

  const activeChatMessages = useMemo(() => {
    return chats.find(({ id }) => id === activeChatId)?.messages ?? [];
  }, [chats, activeChatId]);

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  // ---- FIXED updateChats (title now passed in correctly) ----
  function updateChats(messages = [], title) {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, title: title ?? chat.title, messages }
          : chat
      )
    );
  }

  // ---- Generate chat title from first user message ----
  function handleChatMessagesUpdate(messages) {
    const title = messages[0]?.content
      .split(" ")
      .slice(0, 7)
      .join(" ");

    updateChats(messages, title);
  }

  
  function handleNewChatCreate() {
    const id = uuidv4();

    setChats((prevChats) => [
      ...prevChats,
      { id, title: "New Chat", messages: [] }
    ]);

    setActiveChatId(id);
  }

  
  function handleActiveChatChange(id) {
    setActiveChatId(id);
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


      <div className={styles.Content}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          activeChatMessages={activeChatMessages}
          onActiveChatIdChange={handleActiveChatChange}
          onNewChatCreate={handleNewChatCreate}
        />

        <main className={styles.Main}>
          <Chat
            assistant={assistant}
            chatId={activeChatId}
            chatMessages={activeChatMessages}
            onChatMessagesUpdate={handleChatMessagesUpdate}
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
