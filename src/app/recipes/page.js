"use client";
import { useState, useEffect } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");

    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const recipeList = () => {
    return (
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h1>{recipe.title}</h1>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section>
      <h1>Recipe List</h1>
      {recipeList()}
    </section>
  );
}
