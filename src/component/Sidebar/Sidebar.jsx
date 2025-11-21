import React from "react";
import styles from "./Sidebar.module.css";

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

  const [isOpen, setIsOpen] = React.useState(true);

  function  handleSidebarToggle() { 
    setIsOpen(!isOpen);
  }


  return (
    <>
      <button className={styles.MenuButton}>
        <MenuIcon/>
      </button>

      <div className={styles.Sidebar} data-open={isOpen} >
        <ul className={styles.Chats}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={styles.chat}
              data-active={chat.id === activeChatId}
            >
              <button className={styles.ChatButton}>
                <div className={styles.ChatTitle}>{chat.title}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#2ecc00"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
}

export default Sidebar;
