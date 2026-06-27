import { useCallback, useRef, useState } from 'react'

interface CompareSliderProps {
  beforeLabel: string
  afterLabel: string
  beforeSrc: string
  afterSrc: string
}

export function CompareSlider({
  beforeLabel,
  afterLabel,
  beforeSrc,
  afterSrc,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPosition((x / rect.width) * 100)
  }, [])

  const onPointerDown = () => {
    dragging.current = true
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    updatePosition(e.clientX)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <div
      className="compare-slider"
      ref={containerRef}
      style={{ '--pos': `${position}` } as React.CSSProperties}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <img src={afterSrc} alt={afterLabel} className="compare-img compare-after" />
      <div className="compare-before-wrap" style={{ width: `${position}%` }}>
        <img src={beforeSrc} alt={beforeLabel} className="compare-img compare-before" />
      </div>
      <div
        className="compare-handle"
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="평면도 비교 슬라이더"
      >
        <div className="compare-handle-line" />
        <div className="compare-handle-knob">↔</div>
      </div>
      <span className="compare-label compare-label-before">{beforeLabel}</span>
      <span className="compare-label compare-label-after">{afterLabel}</span>
    </div>
  )
}
