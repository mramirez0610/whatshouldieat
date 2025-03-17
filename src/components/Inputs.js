"use client";
import { useState } from "react";
import styles from "@styles/components/input.module.scss";
import Ingredient from "@components/Ingredient";

export default function Inputs() {
  const [ingredients, setIngredients] = useState([]);
  const [response, setResponse] = useState("");

  const updateIngredient = (id, newValue, newPref) => {
    //this looks digusting LMAO
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, value: newValue, pref: newPref ?? ingredient.pref }
          : ingredient
      )
    );
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length, value: "", pref: 5 },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  async function submit() {
    console.log("sending", ingredients);

    const res = await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    if (!res.ok) {
      setResponse("error fetching response");
      return;
    }

    const data = await res.json();

    console.log("response data:", data);
    console.log("response object:", res);

    setResponse(data.reply || "error fetching response");
  }

  const Ingredients = () => {
    return (
      <>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            id={ingredient.id}
            value={ingredient.value}
            pref={ingredient.pref}
            updateIngredient={updateIngredient}
            removeIngredient={removeIngredient}
          />
        ))}
      </>
    );
  };

  return (
    <div className={styles.inputs}>
      {Ingredients()}
      <button onClick={addIngredient}>Add Ingredient</button>
      <button onClick={submit}>Submit</button>
      <p>{response}</p>
    </div>
  );
}
