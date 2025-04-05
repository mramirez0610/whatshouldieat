import styles from "@styles/components/recipe.module.scss";

export default function Recipe({ data, onBack }) {
  if (!data) return <p>loading</p>;

  console.log(data.optionalIngredients);

  const saveRecipe = () => {
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const newRecipe = {
      title: data.recipeTitle,
      requestedIngredients: data.requestedIngredients,
      optionalIngredients: data.optionalIngredients,
      instructions: data.instructions,
      tips: data.tips,
    };

    const isDuplicate = existingRecipes.some(
      (recipe) => recipe.title === newRecipe.title
    );

    if (!isDuplicate) {
      existingRecipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(existingRecipes));
      alert("recipe saved!");
    } else {
      alert("recipe already saved");
    }
  };

  return (
    <article className={styles.recipe}>
      <button className={styles.back} onClick={onBack}>
        Back
      </button>
      <button className={styles} onClick={saveRecipe}>
        Save recipe
      </button>
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
        <ol>
          {data.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <div className={styles.tips}>
        <h1>Tips</h1>
        <ul>
          {data.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
