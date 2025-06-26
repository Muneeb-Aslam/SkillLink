import ReactDOM from 'react-dom';

const Backdrop = ({ showModal, onClick, className } : { showModal: boolean, onClick: () => void, className?: string }) => {
  const backdrop = showModal && (
    <>
      {/* eslint-disable-next-line */}
      <div
        className={`${className} fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] cursor-pointer z-[1010]`}
        onClick={onClick}
      />
    </>
  );
  return ReactDOM.createPortal(backdrop, document.getElementById('backdrop-hook')!);
};

export default Backdrop;
