"use client";
import { use, useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import styles from "@styles/components/quickBuilder.module.scss";

export default function QuickBuilder({ setResponse, setShowRecipe }) {
  const [ingredients, setIngredients] = useState({});
  const [genre, setGenre] = useState("Salty");
  const [hide, setHide] = useState(true);
  const [expand, setExpand] = useState(false);

  const mealComponents = [
    {
      category: "Protein",
      examples: ["Chicken", "Tofu", "Fish", "Beef", "Eggs", "None"],
    },
    {
      category: "Carbohydrates",
      examples: ["Rice", "Pasta", "Bread", "Couscous", "Quinoa", "None"],
    },
    {
      category: "Vegetables",
      examples: [
        "Broccoli",
        "Carrots",
        "Spinach",
        "Bell Peppers",
        "Zucchini",
        "None",
      ],
    },
    {
      category: "Fats",
      examples: ["Olive oil", "Avocado", "Butter", "Cheese", "Almonds", "None"],
    },
    {
      category: "Fruits",
      examples: [
        "Avocado",
        "Berries",
        "Apple slices",
        "Mango",
        "Grapes",
        "None",
      ],
    },
    {
      category: "Enhancers / Condiments",
      examples: [
        "Salt and pepper",
        "Soy sauce",
        "Fresh herbs",
        "Hot sauce",
        "Lemon juice",
        "None",
      ],
    },
  ];

  const minimizedComponents = mealComponents.slice(0, 3);

  const components = expand ? mealComponents : minimizedComponents;

  async function submit() {
    const ingredientsArray = Object.entries(ingredients)
      .filter(([category, value]) => value && value !== "None")
      .map(([category, value], idx) => ({
        id: idx,
        value,
        pref: 5,
      }));

    const res = await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredientsArray,
        genre,
        prompType: "normal",
      }),
    });

    if (!res.ok) {
      setResponse("error fetching response");
      return;
    }

    const data = await res.json();
    console.log("response data:", data);
    setResponse(data);
    setShowRecipe(true);
  }

  return (
    <section className={styles.quickBuilder}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Quick Builder</h1>
        <button
          className={styles.dropdownButton}
          onClick={() => {
            setHide(!hide);
          }}
        >
          <CaretDown />
        </button>
      </div>

      {hide ? (
        <></>
      ) : (
        <>
          <div className={styles.components}>
            {components.map((c) => (
              <div className={styles.component} key={c.category}>
                <h1>{c.category}</h1>
                <div className={styles.buttons}>
                  {c.examples.map((i) => (
                    <button
                      key={i}
                      className={`${styles.button} ${
                        ingredients[c.category] === i ? styles.active : ""
                      }`}
                      onClick={() => {
                        setIngredients((prev) => ({
                          ...prev,
                          [c.category]: i,
                        }));
                      }}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => setExpand(!expand)}
              className={expand ? styles.active : ""}
            >
              expand
            </button>
            <button onClick={submit}>
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
