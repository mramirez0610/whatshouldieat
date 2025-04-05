import styles from "@styles/components/input.module.scss";

export default function Ingredient({
  id,
  value,
  pref,
  updateIngredient,
  removeIngredient,
}) {
  return (
    <div className={styles.input} key={id}>
      <input
        type="text"
        placeholder="Type Ingredient Here"
        aria-label="Type Ingredient Here"
        value={value}
        onChange={(e) => updateIngredient(id, e.target.value)}
      />
      <div className={styles.preference}>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          aria-label="How Much Do You Like This Ingredient?"
          value={pref}
          onChange={(e) => updateIngredient(id, value, e.target.value)}
        />
        <p>How Much Do You Like This Ingredient?</p>
      </div>
      <button className={styles.remove} onClick={() => removeIngredient(id)}>
        remove
      </button>
    </div>
  );
}
