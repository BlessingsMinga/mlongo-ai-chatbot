import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <img className={styles.Logo} src="/assets/chat-bot.png" alt="Chat-bot icon" />
        <h2 className={styles.Title}>Mlongo AI Bot</h2>
      </header>
      <div className={styles.ChatContainer}></div>
    </div>
  );
}

export default App;
