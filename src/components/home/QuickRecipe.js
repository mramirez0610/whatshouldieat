"use client";
import { useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import styles from "@styles/components/quickRecipe.module.scss";

export default function QuickRecipe({ setResponse, setShowRecipe }) {
  const [genre, setGenre] = useState("");
  const [hide, setHide] = useState(false);
  const genres = ["Sweet", "Sour", "Salty", "Spicy", "Umami"];

  async function submit() {
    const res = await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: [], genre, promptType: "genreOnly" }),
    });

    if (!res.ok) {
      setResponse("error fetching respones");
      return;
    }

    const data = await res.json();
    setResponse(data);
    setShowRecipe(true);
  }

  return (
    <section className={styles.quickRecipe}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Quick Recipe</h1>
        <button
          className={styles.dropdownButton}
          onClick={() => {
            setHide(!hide);
          }}
        >
          <CaretDown />
        </button>
      </div>
      {hide ? (
        <></>
      ) : (
        <>
          <div className={styles.tastes}>
            {genres.map((g) => (
              <button
                key={g}
                className={genre === g ? styles.active : ""}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
          {/* {genre} */}
          <button onClick={submit}>
            <ArrowRight />
          </button>
        </>
      )}
    </section>
  );
}
