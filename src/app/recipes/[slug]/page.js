"use client";
import { useEffect, useState } from "react";
import styles from "@styles/components/recipe.module.scss";
import Link from "next/link";

export default function Recipe({ params }) {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [slug, setSlug] = useState(null);

  //unwraps promise
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    unwrapParams();
  }, [params]);

  //cross references new slug from params and brings data from localstorage
  useEffect(() => {
    if (slug) {
      console.log(slug);
      const fetchRecipe = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        console.log(recipes);
        const recipe = recipes.find((r) => r.slug === slug);
        console.log(recipe);
        setCurrentRecipe(recipe);
      };
      fetchRecipe();
    }
  }, [slug]);

  if (!currentRecipe) {
    return <div>Recipe not found</div>;
  }

  const {
    title,
    requestedIngredients,
    optionalIngredients,
    instructions,
    tips,
  } = currentRecipe;

  return (
    <article className={styles.recipe}>
      <h1 className={styles.recipeTitle}>{title}</h1>
      <div className={styles.ingredients}>
        <div className={styles.requestedIngredients}>
          <h1>Requested Ingredients</h1>
          <ul>
            {requestedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className={styles.optionalIngredients}>
          <h1>Optional Ingredients</h1>
          <ul>
            {optionalIngredients.length === 0 ? (
              <li>No optional ingredients</li>
            ) : (
              optionalIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className={styles.instructions}>
        <h1>Instructions</h1>
        <ol>
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <div className={styles.tips}>
        <h1>Tips</h1>
        <ul>
          {tips.length === 0 ? (
            <li>No tips available</li>
          ) : (
            tips.map((tip, index) => <li key={index}>{tip}</li>)
          )}
        </ul>
      </div>

      <div className={styles.buttons}>
        <Link href="/recipes">
          <button className={styles.button}>Back</button>
        </Link>
        <button className={styles.button}>Edit recipe</button>
        <button className={styles.button}>Delete recipe</button>
      </div>
    </article>
  );
}
