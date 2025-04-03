"use client";
import styles from "@styles/components/nav.module.scss";
import Modal from "@components/Modal";
import AboutModal from "@components/AboutModal";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/recipes">recipes</Link>
        </li>
        <li>
          <div onClick={openModal}>About</div>
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <AboutModal />
          </Modal>
        </li>
      </ul>
    </nav>
  );
}
