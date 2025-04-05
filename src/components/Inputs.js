"use client";
import { useState, useEffect } from "react";
import styles from "@styles/components/input.module.scss";
import Ingredient from "@components/Ingredient";
import Recipe from "@components/Recipe";

export default function Inputs() {
  const [ingredients, setIngredients] = useState([]);
  const [response, setResponse] = useState(""); // purely for logging data at this point
  const [recipeData, setRecipeData] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false); // toggles between inputs and recipe

  useEffect(() => {
    addIngredient();
  }, []);

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
    console.log(res);

    setRecipeData(data);
    setShowRecipe(true); // switches views
  }

  const handleBackToInputs = () => {
    setShowRecipe(false); // returns to inputs
  };

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
      {showRecipe ? (
        <Recipe data={recipeData} onBack={handleBackToInputs} />
      ) : (
        <>
          {Ingredients()}
          <div className={styles.buttons}>
            <button className={styles.button} onClick={addIngredient}>
              Add Ingredient
            </button>
            <button className={styles.button} onClick={submit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
