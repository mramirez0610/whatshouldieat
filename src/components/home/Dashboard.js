"use client";
import { useState } from "react";
import Recipe from "../globals/Recipe";
import QuickRecipe from "./QuickRecipe";
import QuickBuilder from "./QuickBuilder";
import RecipeBuilder from "../recipeBuilder/RecipeBuilder";
import styles from "@styles/components/dashboard.module.scss";

export default function Dashboard({ username }) {
  const [response, setResponse] = useState("");
  const [showRecipe, setShowRecipe] = useState(false);

  const handleBack = () => setShowRecipe(false);

  return (
    <section className={styles.userDashboard}>
      {showRecipe ? (
        <Recipe data={response} onBack={handleBack} />
      ) : (
        <>
          <div>
            <h1>welcome {username}</h1>
          </div>
          <div className={styles.dashboard}>
            <div className={styles.quickSection}>
              <QuickRecipe
                setResponse={setResponse}
                setShowRecipe={setShowRecipe}
              />
              <QuickBuilder
                setResponse={setResponse}
                setShowRecipe={setShowRecipe}
              />
            </div>

            <RecipeBuilder />
          </div>

          {/* <Link href="/recipeBuilder">recipe builder</Link> */}
        </>
      )}
    </section>
  );
}
