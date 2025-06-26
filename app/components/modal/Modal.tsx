'use client'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from "./Backdrop";

const ModalOverlay = ({ showModal, className, children } : { showModal: boolean, className?: string, children: React.ReactNode }) => (
  <CSSTransition in={showModal} timeout={200} classNames="modal" mountOnEnter unmountOnExit>
    <div
      className={`${className} fixed left-1/2 -translate-x-1/2 lg:-translate-x-[35%] 2xl:-translate-x-[45%] top-1/2 -translate-y-1/2 rounded-md overflow-hidden 
                      w-[88%] sm:w-4/5 md:w-[70%] lg:w-[57%] xl:w-1/2 2xl:w-[40.5%] h-fit bg-white transition-all duration-200 box-shadow opacity-100 z-[1030]`}
    >
      <div className="content">{children}</div>
    </div>
  </CSSTransition>
);

const portalElement = document.getElementById("overlay")!;

const Modal = ( { showModal, onClose, className, children } : { showModal: boolean, onClose: () => void, className?: string, children: React.ReactNode }) => {
  if (!portalElement) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClose} showModal={showModal} className={className} />,
        portalElement
      )}

      {ReactDOM.createPortal(
        <ModalOverlay className={className} showModal={showModal}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
