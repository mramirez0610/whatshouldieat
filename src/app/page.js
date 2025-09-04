"use client";
import Dashboard from "@/components/home/Dashboard";
import Landing from "@/components/home/Landing";
import { useState, useEffect } from "react";
import { auth } from "./util/firebase";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return <>{user ? <Dashboard username={user.displayName} /> : <Landing />}</>;
}
