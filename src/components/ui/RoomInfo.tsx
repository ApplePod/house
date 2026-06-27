import { rooms3d, houseInfo } from '../../data/floorPlan'
import { useStore } from '../../store/useStore'

export function RoomInfo() {
  const { selectedRoomId, furniture } = useStore()
  const room = rooms3d.find((r) => r.id === selectedRoomId)

  if (!room) {
    return (
      <div className="room-info empty">
        <h3>공간 구상</h3>
        <p>바닥을 클릭해 공간을 선택하면 메모와 배치 현황을 볼 수 있습니다.</p>
      </div>
    )
  }

  const roomFurniture = furniture.filter((f) => {
    const xs = room.floor.map(([x]) => x)
    const zs = room.floor.map(([, z]) => z)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minZ = Math.min(...zs)
    const maxZ = Math.max(...zs)
    return f.x >= minX && f.x <= maxX && f.z >= minZ && f.z <= maxZ
  })

  return (
    <div className="room-info">
      <div className="room-info-header" style={{ borderColor: room.color }}>
        <h3>{room.name}</h3>
        <span>{room.area}</span>
      </div>
      <div className="room-notes">
        <h4>실측 · 계획</h4>
        <ul>
          {room.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
      {roomFurniture.length > 0 && (
        <div className="room-furniture-list">
          <h4>배치된 가구 ({roomFurniture.length})</h4>
          <ul>
            {roomFurniture.map((f) => (
              <li key={f.id}>{f.type}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const { viewMode, setViewMode } = useStore()

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-badge">3D 인테리어</span>
        <h1>{houseInfo.title}</h1>
        <p>{houseInfo.address}</p>
      </div>
      <div className="header-controls">
        <button
          type="button"
          className={`view-btn ${viewMode === '3d' ? 'active' : ''}`}
          onClick={() => setViewMode('3d')}
        >
          3D
        </button>
        <button
          type="button"
          className={`view-btn ${viewMode === 'top' ? 'active' : ''}`}
          onClick={() => setViewMode('top')}
        >
          탑뷰
        </button>
      </div>
    </header>
  )
}
