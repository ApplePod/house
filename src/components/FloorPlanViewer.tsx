import type { Room } from '../data/house'

interface FloorPlanViewerProps {
  rooms: Room[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  imageSrc: string
  imageAlt: string
}

export function FloorPlanViewer({
  rooms,
  selectedId,
  onSelect,
  imageSrc,
  imageAlt,
}: FloorPlanViewerProps) {
  return (
    <div className="floor-plan-viewer">
      <div className="floor-plan-frame">
        <img src={imageSrc} alt={imageAlt} className="floor-plan-img" />
        <svg
          viewBox="0 0 760 540"
          className="floor-plan-overlay"
          preserveAspectRatio="none"
        >
          {rooms.map((room) => (
            <polygon
              key={room.id}
              points={room.polygon}
              className={`room-zone ${selectedId === room.id ? 'selected' : ''} ${selectedId && selectedId !== room.id ? 'dimmed' : ''}`}
              fill={room.color}
              onClick={() => onSelect(selectedId === room.id ? null : room.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(selectedId === room.id ? null : room.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${room.name} 선택`}
            />
          ))}
        </svg>
      </div>
      <div className="room-legend">
        {rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            className={`legend-item ${selectedId === room.id ? 'active' : ''}`}
            onClick={() => onSelect(selectedId === room.id ? null : room.id)}
          >
            <span className="legend-dot" style={{ background: room.color }} />
            {room.name}
            {room.area && <span className="legend-area">{room.area}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
