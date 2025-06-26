"use client"
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { CheckCircledIcon, CrossCircleIcon } from '../icons';
import Modal from './Modal';

const ConfirmationModal = ({ confirmationModal, setConfirmationModal, onConfirm } : 
  { confirmationModal: boolean, setConfirmationModal: (arg0: boolean) => void, onConfirm: () => void }
) => {
  
  useEffect(() => {
    const escFunction = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirmationModal(false);
      }
    };
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <Modal onClose={() => setConfirmationModal(false)} showModal={confirmationModal}>
      <div className="pb-4 flex flex-col items-center justify-center gap-4 sm:gap-7 w-full">
        <h3 className="py-3 px-4 sm:py-4 sm:px-6 text-lg text-grayish font-bold bg-primary-background w-full">
          Confirmation
        </h3>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-4 md:px-4 lg:px-4 xl:px-6 w-full font-semibold">
          <div className="">
            <span>Are you sure you want hire this freelancer?</span>
            <span className="text-gray-600 block lg:text-[0.94rem] xl:text-base">
              If so, select “confirm” to proceed.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center gap-4">
          <Button
            className="flex items-center justify-center gap-1 sm:gap-2 !text-gray-600 !border !border-gray-400 !bg-transparent hover:!bg-gray-100 hover:!text-black hover:!border-gray-800 font-semibold"
            onClick={() => setConfirmationModal(false)}
          >
            <CrossCircleIcon />
            <span>Cancel</span>
          </Button>
          <Button
            className="flex items-center justify-center gap-1 sm:gap-2 font-semibold"
            onClick={onConfirm}
          >
            <CheckCircledIcon />
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;