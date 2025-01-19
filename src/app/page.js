import ChatComponent from "./Components/ChatComponent";
import styles from "./page.module.css"
export default function Home() {
  return (
    <div className={styles.page} style={{ marginTop: '20%' }}>
<ChatComponent/>
    </div>
  );
}
