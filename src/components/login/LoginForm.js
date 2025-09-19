import styles from "@styles/components/loginModal.module.scss";
import { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/util/firebase";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={styles.login}>
      <h1>Login to get started</h1>
      <label htmlFor="Email" className={styles.input}>
        Email:
      </label>
      <input
        type="text"
        onChange={(e) => {
          setLoginEmail(e.target.value);
        }}
      />
      <label htmlFor="Password" className={styles.input}>
        Password:
      </label>
      <input
        type="password"
        onChange={(e) => {
          setLoginPassword(e.target.value);
        }}
      />
      <button className={styles.button} onClick={handleSignIn}>
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
