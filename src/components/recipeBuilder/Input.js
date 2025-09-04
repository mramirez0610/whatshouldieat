import { useRef, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import styles from "@styles/components/input.module.scss";

export default function Input({
  id,
  value,
  pref,
  updateIngredient,
  removeIngredient,
}) {
  const sliderRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const tag = tagRef.current;
    if (slider && tag) {
      const min = Number(slider.min);
      const max = Number(slider.max);
      const percent = (pref - min) / (max - min);
      const sliderWidth = slider.offsetWidth;
      const tagWidth = tag.offsetWidth;
      // calculate position so tag is centered above thumb
      const left = percent * (sliderWidth - 16) - tagWidth / 2 + 8; // 16 is approx thumb width
      tag.style.left = `${left}px`;
    }
  }, [pref]);

  return (
    <div className={styles.inputContainer} key={id}>
      <div className={styles.textContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type Ingredient Here"
          aria-label="Type Ingredient Here"
          value={value}
          onChange={(e) => updateIngredient(id, e.target.value)}
        />
        <button className={styles.remove} onClick={() => removeIngredient(id)}>
          <X size={24} />
        </button>
      </div>
      <div className={styles.preferenceContainer}>
        <span ref={tagRef} className={styles.thumbTag}>
          {pref}
        </span>
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="10"
          step="1"
          aria-label="How Much Do You Like This Ingredient?"
          value={pref}
          className={styles.preference}
          onChange={(e) => updateIngredient(id, value, e.target.value)}
        />
        <p>How Much Do You Like This Ingredient?</p>
      </div>
    </div>
  );
}
