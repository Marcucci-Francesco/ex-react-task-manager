export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

  if (!show) {
    return null;
  }
  return createPortal(
    <div className="modal" tabindex="-1">
      <div>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          {content}
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onClose}>Annulla</button>
          <button className="btn btn-primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  )
}