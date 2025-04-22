"use client";
import { useState } from "react";
import Modal from "@components/Modal";
import AboutModal from "@components/AboutModal";
import Link from "next/link";
import { Heart } from "@phosphor-icons/react";
import styles from "@styles/components/footer.module.scss";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.footer}>
      <h4>
        Made with love by marco <Heart size={24} />
      </h4>
      <h4>
        <Link href="https://github.com/mramirez0610/whatshouldieat">
          Source Code
        </Link>
      </h4>
      <div className={styles.modalWrapper}>
        <h4 onClick={openModal}>More About This</h4>
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <AboutModal />
        </Modal>
      </div>
    </div>
  );
}
