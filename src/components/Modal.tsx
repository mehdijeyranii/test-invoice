import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/90">
      <div
        ref={modalRef}
        className="bg-neutral-100 rounded-xl shadow-lg w-full max-w-lg p-4 relative border border-neutral-400 text-neutral-800"
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4 border-b border-border pb-4">
            {title}
          </h2>
        )}
        <button
          onClick={onClose}
          className="absolute top-5 left-4 text-zinc-400 hover:text-zinc-900 cursor-pointer"
        >
          <X size={20} />
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
