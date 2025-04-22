import styles from "@styles/components/recipe.module.scss";
import Notification from "@components/Notification";
import { useState } from "react";

export default function Recipe({ data, onBack }) {
  const [notificationMessage, setNotificationMessage] = useState("");

  if (!data) return <p>loading</p>;

  console.log(data.optionalIngredients);

  const saveRecipe = () => {
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const newRecipe = {
      slug: data.slug,
      title: data.recipeTitle,
      requestedIngredients: data.requestedIngredients,
      optionalIngredients: data.optionalIngredients,
      description: data.description,
      instructions: data.instructions,
      tips: data.tips,
    };

    const isDuplicate = existingRecipes.some(
      (recipe) => recipe.title === newRecipe.title
    );

    if (!isDuplicate) {
      existingRecipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(existingRecipes));

      setNotificationMessage("Recipe saved!");
      setTimeout(() => setNotificationMessage(""), 5000);
    } else {
      setNotificationMessage("Recipe already saved.");
      setTimeout(() => setNotificationMessage(""), 5000);
    }
  };

  return (
    <article className={styles.recipe}>
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          onClose={() => setNotificationMessage(null)}
        />
      )}
      <h1 className={styles.recipeTitle}>{data.recipeTitle}</h1>
      <div className={styles.ingredients}>
        <div className={styles.requestedIngredients}>
          <h1>Requested Ingredients</h1>
          <ul>
            {/* cool ternary... these are so sick */}
            {(Array.isArray(data.requestedIngredients)
              ? data.requestedIngredients
              : [data.requestedIngredients]
            ).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.optionalIngredients}>
          <h1>Optional Ingredients</h1>
          <ul>
            {!Array.isArray(data.optionalIngredients) ||
            data.optionalIngredients.length === 0 ? (
              <li>No optional ingredients</li>
            ) : (
              data.optionalIngredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className={styles.instructions}>
        <h1>Instructions</h1>
        <ul>
          {data.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      <div className={styles.tips}>
        <h1>Tips</h1>
        <ul>
          {data.tips?.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={onBack}>
          Back
        </button>
        <button className={styles.button} onClick={saveRecipe}>
          Save recipe
        </button>
      </div>
    </article>
  );
}
