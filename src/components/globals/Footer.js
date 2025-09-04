"use client";
import { useState } from "react";
import Modal from "@/components/globals/Modal";
import AboutModal from "@/components/globals/AboutModal";
import Link from "next/link";
import { Heart } from "@phosphor-icons/react";
import styles from "@styles/components/footer.module.scss";
import useModal from "@/app/hooks/useModal";

export default function Footer() {
  const { isOpen, open, close } = useModal();

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
        <h4 onClick={open}>More About This</h4>
        <Modal isOpen={isOpen} closeModal={close}>
          <AboutModal />
        </Modal>
      </div>
    </div>
  );
}
