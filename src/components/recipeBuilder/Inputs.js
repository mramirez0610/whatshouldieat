"use client";
import { useState, useEffect } from "react";
import Input from "@/components/recipeBuilder/Input";

export default function Inputs({
  ingredients,
  setIngredients,

  addIngredient,
}) {
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
