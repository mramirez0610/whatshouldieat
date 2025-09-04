import styles from "@styles/components/loginModal.module.scss";
import { useState } from "react";
import { auth, db } from "@/app/util/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpForm() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(null);
        return updateProfile(user, {
          displayName: signUpUsername,
        }).then(async () => {
          const userRef = doc(db, "users", user.uid);
          const newProfile = {
            email: user.email,
            username: signUpUsername,
            profilePicture: user.photoURL || "",
            phoneNumber: user.phoneNumber || "",
            emailVerified: user.emailVerified,
          };
          // console.log("newProfile: ", newProfile);
          await setDoc(userRef, newProfile);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={styles.signUp}>
      <h1>Create an account!</h1>
      <label htmlFor="Email" className={styles.input}>
        Email:
      </label>
      <input
        type="text"
        onChange={(e) => {
          setSignUpEmail(e.target.value);
        }}
      />
      <label htmlFor="Username" className={styles.input}>
        Username:
      </label>
      <input
        type="text"
        onChange={(e) => {
          setSignUpUsername(e.target.value);
        }}
      />
      <label htmlFor="Password" className={styles.input}>
        Password:
      </label>
      <input
        type="text"
        onChange={(e) => {
          setSignUpPassword(e.target.value);
        }}
      />
      <button className={styles.button} onClick={handleSignUp}>
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
