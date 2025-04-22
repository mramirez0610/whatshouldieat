import "@styles/globals.scss";
import styles from "@styles/pages/home.module.scss";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <section className={styles.content}>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
