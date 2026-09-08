export default function StatusMessage({ type = 'info', children }) {
  return <div className={`status-message ${type}`} role={type === 'error' ? 'alert' : 'status'}>{children}</div>
}
