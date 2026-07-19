import './Sidebar.css'

export default function FabButton({ icon, title, active, onClick }) {
  return (
    <button
      className={`sidebar-fab${active ? ' active' : ''}`}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
