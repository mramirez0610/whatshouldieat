"use client";
import styles from "@styles/pages/home.module.scss";
import Inputs from "@components/Inputs";
import { useState } from "react";

export default function Landing() {
  const [landingVisible, setLandingVisible] = useState(true);

  return (
    <article className={styles.home}>
      <div className={landingVisible ? styles.landing : styles.hidden}>
        <h1>
          <span>W</span>
          <span>h</span>
          <span>a</span>
          <span>t</span> <span>S</span>
          <span>h</span>
          <span>o</span>
          <span>u</span>
          <span>l</span>
          <span>d</span> <span>I</span> <span>E</span>
          <span>a</span>
          <span>t</span>
          <span>?</span>
        </h1>
        <h3>The rundown:</h3>
        <p>
          My least favorite part of the day is deciding what I want to eat. I
          sit for a while, I get overwhelmed by choice, and then I give up and
          go out to eat. I made this for those moments in specific.
        </p>
        <h3>How it works:</h3>
        <p>
          Enter an ingredient. Select how much you like each ingredient, and
          then click enter! Cheers!
        </p>
      </div>

      <Inputs
        isVisible={landingVisible}
        setLandingVisible={setLandingVisible}
        className={landingVisible ? styles.landing : styles.hidden}
      />
    </article>
  );
}
