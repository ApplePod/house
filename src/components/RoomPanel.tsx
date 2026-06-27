import type { Room } from '../data/house'

interface RoomPanelProps {
  room: Room | null
}

export function RoomPanel({ room }: RoomPanelProps) {
  if (!room) {
    return (
      <aside className="room-panel empty">
        <h3>공간을 선택하세요</h3>
        <p>평면도에서 방을 클릭하면 실측 메모와 꾸미기 계획을 확인할 수 있습니다.</p>
      </aside>
    )
  }

  return (
    <aside className="room-panel">
      <div className="room-panel-header" style={{ borderColor: room.color }}>
        <h3>{room.name}</h3>
        {room.area && <span className="room-area">{room.area}</span>}
      </div>
      <div className="room-notes">
        <h4>실측 · 계획 메모</h4>
        <ul>
          {room.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
      <div className="room-photo-placeholder">
        <p>📷 이 공간 사진 추가 예정</p>
        <span>직접 찍은 사진을 추가하면 평면도와 비교할 수 있습니다</span>
      </div>
    </aside>
  )
}
