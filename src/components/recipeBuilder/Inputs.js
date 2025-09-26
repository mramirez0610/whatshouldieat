"use client";
import { useEffect } from "react";
import Input from "@/components/recipeBuilder/Input";

export default function Inputs({ ingredients, setIngredients, addIngredient }) {
  useEffect(() => {
    ingredients.length === 0 ? addIngredient() : null;
  }, [addIngredient, ingredients]);

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

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <>
      {ingredients.map((ingredient) => (
        <Input
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
}
