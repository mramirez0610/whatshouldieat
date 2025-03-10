import styles from "@styles/components/modal.module.scss";

export default function Modal({ closeModal, isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div onClick={closeModal}>X</div>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
}
