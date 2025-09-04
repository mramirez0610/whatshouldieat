"use client";
import styles from "@styles/components/nav.module.scss";
import { useState, useEffect } from "react";
import { auth } from "@/app/util/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        location.reload;
      })
      .catch((error) => {
        console.log("an error occured while signing out");
      });
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/recipes">Recipes</Link>
            </li>
            <li onClick={handleLogOut}>
              <a>Log Out</a>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
