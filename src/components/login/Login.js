import styles from "@styles/components/login.module.scss";
import Modal from "@/components/globals/Modal";
import LoginModal from "@/components/login/LoginModal";
import useModal from "@/app/hooks/useModal";

export default function Login() {
  const { isOpen, open, close } = useModal();

  return (
    <div className={styles.user}>
      <div className={styles.login}>
        <button onClick={open}>login/sign up</button>
      </div>
      <span>OR</span>
      <div className={styles.guest}>
        <button>continue as guest</button>
      </div>
      <Modal isOpen={isOpen} closeModal={close}>
        <LoginModal />
      </Modal>
    </div>
  );
}
