export default function ModalItem({ children }) {
  return (
    <div style={{backgroundColor: `rgba(0, 0, 0, 0.5)`}} className="fixed w-screen h-screen z-1">
      <div className="modal-content bg-[#191919] w-[500px] h-max m-auto rounded-md p-10 relative mt-50">
        {children}
      </div>
    </div>
  );
}
