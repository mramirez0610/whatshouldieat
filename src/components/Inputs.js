"use client";
import { useState } from "react";
import styles from "@styles/components/input.module.scss";
import Ingredient from "@components/Ingredient";

export default function Inputs() {
  const [ingredients, setIngredients] = useState([]);

  const updateIngredient = (id, newValue, newPref) => {
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

  const submit = () => {
    console.log(
      "i would like to make a recipe containing the following. the list will have an item, as well as how much i like that item.",
      ingredients
    );
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
      {Ingredients()}
      <button onClick={addIngredient}>Add Ingredient</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
