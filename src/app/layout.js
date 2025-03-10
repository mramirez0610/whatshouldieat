import "@styles/globals.scss";
import styles from "@styles/pages/home.module.scss";
import Nav from "@/components/Nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <section className={styles.content}>{children}</section>
      </body>
    </html>
  );
}
