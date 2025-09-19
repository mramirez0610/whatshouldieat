"use client";
import { useState } from "react";
import QuickRecipe from "./QuickRecipe";
import QuickBuilder from "./QuickBuilder";
import RecipeBuilder from "../recipeBuilder/RecipeBuilder";
import styles from "@styles/components/dashboard.module.scss";

export default function Dashboard({ username }) {
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <section className={styles.userDashboard}>
      <>
        <div>
          <h1>welcome {username}</h1>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.quickSection}>
            <QuickRecipe
              setRecipeData={setRecipeData}
              setLoading={setLoading}
            />
            <QuickBuilder
              setRecipeData={setRecipeData}
              setLoading={setLoading}
            />
          </div>

          <RecipeBuilder recipeData={recipeData} loading={loading} />
        </div>

        {/* <Link href="/recipeBuilder">recipe builder</Link> */}
      </>
    </section>
  );
}
