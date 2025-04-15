"use client";
import styles from "@styles/pages/recipes.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";

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
      <div className={styles.recipes}>
        {recipes.map((recipe, index) => (
          <div className={styles.recipe} key={index}>
            <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <article className={styles.recipeList}>
      <h1>Recipe List</h1>
      {recipeList()}
    </article>
  );
}
