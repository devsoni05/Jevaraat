function InventoryMessage({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show shadow`}
      role="alert"
      style={{
        position: "fixed",
        top: "90px",
        right: "24px",
        zIndex: 2000,
        minWidth: "280px",
        maxWidth: "420px",
      }}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default InventoryMessage;
