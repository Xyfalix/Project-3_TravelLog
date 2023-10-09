const Modal = () => {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to delete this?</h3>
          <p className="py-4">
            Press ESC key or click the button below to confirm
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Delete</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
