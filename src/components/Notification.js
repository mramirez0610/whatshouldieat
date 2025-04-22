import { useState, useEffect } from "react";
import styles from "@styles/components/notification.module.scss";
import { XCircle } from "@phosphor-icons/react";

export default function Notification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className={styles.notification}>
      <div className={styles.dismiss} onClick={onClose}>
        <XCircle size={32} />
      </div>
      <div className={styles.message}>
        <span>{message}</span>
      </div>
    </div>
  );
}
