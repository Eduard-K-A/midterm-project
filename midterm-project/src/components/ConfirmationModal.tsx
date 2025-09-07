interface ConfirmationModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({ message, onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <>
      <div className="overlay" onClick={onCancel} />
      <div className="modal">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes, Cancel</button>
        <button onClick={onCancel}>No</button>
      </div>
    </>
  )
}