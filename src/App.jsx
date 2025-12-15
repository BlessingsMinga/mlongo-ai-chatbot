import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";

import { Chat } from "./component/Chat/Chat";
import { Assistant } from "./component/Assistant/Assistant";
import { Theme } from "./component/Theme/Theme";
import Sidebar from "./component/Sidebar/Sidebar";


function App() {
  const [assistant, setAssistant] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState();

  const activeChatMessages = useMemo(() => {
    return chats.find(({ id }) => id === activeChatId)?.messages ?? [];
  }, [chats, activeChatId]);

  useEffect(() => {
    // load chats from backend on start, then select first or create new
    fetch('/api/chats')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          handleNewChatCreate();
          return;
        }
        setChats(data);
        setActiveChatId(data[0].id);
      })
      .catch(() => {
        // if backend not available, fall back to an in-memory chat
        handleNewChatCreate();
      });
  }, []);

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  // Update chats with new messages and optional title
  function updateChats(messages = [], title, id) {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id
          ? { ...chat, title: title ?? chat.title, messages }
          : chat
      )
    );
  }

  // Generate chat title from first user message safely
  function handleChatMessagesUpdate(chatId, messages) {
    if (!messages || messages.length === 0 || !messages[0].content) return;

    const title = messages[0].content
      .split(" ")
      .slice(0, 7)
      .join(" ");

    updateChats(messages, title, chatId);
  }

  function handleNewChatCreate() {
    const id = uuidv4();

    const newChat = { id, title: 'New Chat', messages: [] };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(id);

    // persist empty chat on server with clientId so it appears on reload
    fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: id, title: newChat.title, messages: newChat.messages }),
    }).catch(() => {});
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
          setChats={setChats}
          activeChatId={activeChatId}
          activeChatMessages={activeChatMessages}
          onActiveChatIdChange={handleActiveChatChange}
          onNewChatCreate={handleNewChatCreate}
        />

        <main className={styles.Main}>
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              assistant={assistant}
              isActive={chat.id === activeChatId}
              chatId={chat.id}
              chatMessages={chat.messages}
              onChatMessagesUpdate={handleChatMessagesUpdate}
            />
          ))}

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
