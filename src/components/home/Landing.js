"use client";
import styles from "@styles/pages/home.module.scss";
import Login from "@/components/login/Login";

export default function Landing() {
  return (
    <article className={styles.home}>
      <div className={styles.landing}>
        <h1 className={styles.title}>What Should I Eat?</h1>
        <h3>The rundown:</h3>
        <p>
          My least favorite part of the day is deciding what I want to eat. I
          sit for a while, I get overwhelmed by choice, and then I give up and
          go out to eat. I made this for those moments in specific.
        </p>
      </div>
      <Login />
    </article>
  );
}
