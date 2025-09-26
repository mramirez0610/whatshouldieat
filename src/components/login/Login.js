import styles from "@styles/components/login.module.scss";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/app/util/firebase";
import Modal from "@/components/globals/Modal";
import LoginModal from "@/components/login/LoginModal";
import useModal from "@/app/hooks/useModal";

export default function Login() {
  const { isOpen, open, close } = useModal();

  return (
    <div className={styles.user}>
      <h3>Sign up for free today!</h3>
      <div className={styles.login}>
        <button className={styles.button} onClick={open}>
          login/sign up
        </button>
      </div>
      <span>OR</span>

      <h3>Don&apos;t want an account?</h3>
      <div className={styles.guest}>
        <button
          className={styles.button}
          onClick={() => signInAnonymously(auth)}
        >
          continue as guest
        </button>
      </div>
      <Modal isOpen={isOpen} closeModal={close}>
        <LoginModal />
      </Modal>
    </div>
  );
}
