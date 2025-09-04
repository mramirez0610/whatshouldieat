import styles from "@styles/components/modal.module.scss";
import { X } from "@phosphor-icons/react";

export default function Modal({ closeModal, isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalBackdrop} onClick={closeModal}></div>
      <div className={styles.modalContainer}>
        <X
          size={24}
          className={styles.modalContainerClose}
          onClick={closeModal}
        />
        <div className={styles.modalContainerContent}>{children}</div>
      </div>
    </div>
  );
}
