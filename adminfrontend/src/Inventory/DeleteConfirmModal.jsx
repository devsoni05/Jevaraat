function DeleteConfirmModal({ productName, isDeleting, onCancel, onConfirm }) {
  if (!productName) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete product?</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
                disabled={isDeleting}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">
                Are you sure you want to delete <b>{productName}</b> from this
                listing?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default DeleteConfirmModal;
