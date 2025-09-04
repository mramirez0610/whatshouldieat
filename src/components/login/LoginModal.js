import styles from "@styles/components/loginModal.module.scss";
import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/util/firebase";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function LoginModal() {
  const [formState, setFormState] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is signed in:", user);
    } else {
      console.log("user is signed out");
    }
  });

  return (
    <div className={styles.loginModal}>
      {formState ? <LoginForm /> : <SignUpForm />}
      <div>
        {formState ? (
          <h1>Need an account?</h1>
        ) : (
          <h1>Already have an account?</h1>
        )}
        <button
          onClick={() => {
            setFormState(!formState);
          }}
          className={styles.button}
        >
          {formState ? <>Sign Up</> : <>Log In</>}
        </button>
      </div>
    </div>
  );
}
