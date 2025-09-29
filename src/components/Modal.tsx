import React from "react";
import Button from "./Button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, message }) =>
  !isOpen ? null : (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md min-w-[320px]">
        <p className="mb-6 text-center text-lg">{message}</p>
        <div className="flex justify-center space-x-6">
          <Button
            className="bg-red-500 hover:bg-red-600 min-w-[80px]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 min-w-[80px]"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
export default Modal;
