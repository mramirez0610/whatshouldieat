"use client";
import { useState } from "react";
import Modal from "@components/Modal";
import AboutModal from "@components/AboutModal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div onClick={openModal}>About</div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <AboutModal />
      </Modal>
    </div>
  );
}
