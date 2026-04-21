export default function ConfirmModal({ open, onClose, onSolved }) {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSolved?.();
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Security check</h2>
        <p className="muted">One quick step to keep the form safe. Tick the box below to continue.</p>
        <form onSubmit={handleSubmit}>
          <label className="confirm-check">
            <input type="checkbox" required /> I'm not a robot
          </label>
          <div className="modal__actions">
            <button type="submit">Continue</button>
            <button type="button" onClick={onClose} className="ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
