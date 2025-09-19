"use client";
import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import Recipe from "../globals/Recipe";
import styles from "@styles/components/recipeBuilder.module.scss";
import Inputs from "@/components/recipeBuilder/Inputs";

export default function RecipeBuilder({ recipeData, loading }) {
  const [ingredients, setIngredients] = useState([]);
  const [response, setResponse] = useState("");
  const [hide, setHide] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false); // toggles between inputs and recipe

  useEffect(() => {
    if (recipeData) {
      setResponse(recipeData);
      setShowRecipe(true);
    }
  }, [recipeData]);

  async function submit() {
    const res = await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients,
        //genre must be implemented
        genre: "genre",
        promptType: "normal",
      }),
    });

    if (!res.ok) {
      setResponse("error fetching response");
      return;
    }

    const data = await res.json();
    setResponse(data);
    setShowRecipe(true); // switches views
  }

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length, value: "", pref: 5 },
    ]);
  };

  const handleBackToInputs = () => {
    setShowRecipe(false); // returns to inputs
  };

  return (
    <section className={styles.recipeBuilder}>
      {loading ? (
        <div className={styles.loadingScreen}>
          <h2>Loading...</h2>
        </div>
      ) : showRecipe ? (
        <Recipe data={response} onBack={handleBackToInputs} />
      ) : (
        <>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Recipe Builder</h1>
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
              <Inputs
                ingredients={ingredients}
                setIngredients={setIngredients}
                addIngredient={addIngredient}
                setShowRecipe={setShowRecipe}
                handleBackToInputs={handleBackToInputs}
              />
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
        </>
      )}
    </section>
  );
}
