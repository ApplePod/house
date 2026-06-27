/**
 * 201호 건축물현황도 (공식) + 베란다 확장 반영
 *
 *  Z=5.4  [발코니 1100][  주방 2700  ][   거실 (L형)     ]
 *  Z=4.0  [발코니      ][           ][  침실-1 (3500)    ]  ← 침실-1 북벽
 *  Z=2.7  [발코니      ][           ][욕실][  침실-1      ]
 *  Z=0    [발코니      ][ 침실-2    ][욕실][  침실-1      ]
 *
 *  · 발코니: 좌측 전체 1100×5400 (주방·침실-2) — 확장 없음
 *  · 침실-1: 우측 하단 3500×4000 (13㎡) — 베란다 확장 반영
 *  · 침실-2: 좌측 하단 2700×2700 (6㎡)
 */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12
export const BALCONY_STEP = 0.16

/** 건축물현황도 치수 (m) */
export const D = {
  balconyW: 1.1,
  colKitchen: 2.7,
  colBath: 1.4,
  colBed1: 3.5,
  rowH: 2.7,
  bed1Depth: 4.0,
} as const

export const X = {
  bal: 0,
  in: D.balconyW,
  kitchen: D.balconyW + D.colKitchen,
  bath: D.balconyW + D.colKitchen + D.colBath,
  east: D.balconyW + D.colKitchen + D.colBath + D.colBed1,
} as const

export const Z = {
  south: 0,
  mid: D.rowH,
  bed1North: D.bed1Depth,
  north: D.rowH * 2,
} as const

export interface Room3D {
  id: string
  name: string
  area: string
  color: string
  floor: [number, number][]
  notes: string[]
  raisedSection?: { floor: [number, number][]; height: number }
}

export const UNIT = { width: X.east, depth: Z.north }

export const rooms3d: Room3D[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '6㎡',
    color: '#a8d5ba',
    floor: [
      [X.bal, Z.south],
      [X.in, Z.south],
      [X.in, Z.north],
      [X.bal, Z.north],
    ],
    notes: ['1100×5400mm', '주방·침실-2 연결', '단차 16cm', '확장 없음'],
  },
  {
    id: 'kitchen',
    name: '주방',
    area: '7㎡',
    color: '#f4c4a0',
    floor: [
      [X.in, Z.mid],
      [X.kitchen, Z.mid],
      [X.kitchen, Z.north],
      [X.in, Z.north],
    ],
    notes: ['2700×2700mm', '싱크·가스레인지', '발코니 확장 없음 (벽 유지)'],
  },
  {
    id: 'living',
    name: '거실',
    area: '10㎡',
    color: '#f5e6a3',
    floor: [
      [X.kitchen, Z.mid],
      [X.bath, Z.mid],
      [X.bath, Z.bed1North],
      [X.east, Z.bed1North],
      [X.east, Z.north],
      [X.kitchen, Z.north],
    ],
    notes: ['주방 오픈형', '201호 현관', '침실-1 북측 복도'],
  },
  {
    id: 'bedroom2',
    name: '침실-2',
    area: '6㎡',
    color: '#b8d4a0',
    floor: [
      [X.in, Z.south],
      [X.kitchen, Z.south],
      [X.kitchen, Z.mid],
      [X.in, Z.mid],
    ],
    notes: ['2700×2700mm', '발코니 옆', '발코니 확장 없음'],
  },
  {
    id: 'bathroom',
    name: '욕실',
    area: '4㎡',
    color: '#a0bcd4',
    floor: [
      [X.kitchen, Z.south],
      [X.bath, Z.south],
      [X.bath, Z.mid],
      [X.kitchen, Z.mid],
    ],
    notes: ['1400×2700mm', '타일·배수', '환기'],
  },
  {
    id: 'bedroom1',
    name: '침실-1',
    area: '13㎡',
    color: '#90c9b0',
    floor: [
      [X.bath, Z.south],
      [X.east, Z.south],
      [X.east, Z.bed1North],
      [X.bath, Z.bed1North],
    ],
    notes: [
      '✅ 베란다 확장 완료',
      '3500×4000mm (13㎡)',
      '단차 16cm',
      '스타일러·붙박이장',
    ],
  },
]

export const walls: [number, number, number, number][] = [
  // 외벽
  [X.bal, Z.south, X.east, Z.south],
  [X.east, Z.south, X.east, Z.north],
  [X.east, Z.north, X.bal, Z.north],
  [X.bal, Z.north, X.bal, Z.south],
  // 발코니 칸막이 (전체 — 주방·침실-2, 확장 없음)
  [X.in, Z.south, X.in, Z.north],
  // 좌측 가로벽 (주방/침실-2)
  [X.in, Z.mid, X.kitchen, Z.mid],
  // 침실-2 / 욕실
  [X.kitchen, Z.south, X.kitchen, Z.mid],
  // 욕실 / 침실-1
  [X.bath, Z.south, X.bath, Z.bed1North],
  // 침실-1 북벽 (4000mm — 좌측보다 1300mm 더 깊음)
  [X.bath, Z.bed1North, X.east, Z.bed1North],
  // 주방 / 거실
  [X.kitchen, Z.mid, X.kitchen, Z.north],
  // 욕실 상단 / 거실
  [X.bath, Z.mid, X.bath, Z.bed1North],
]

export const doors: { x: number; z: number; width: number; rot: number; label: string }[] = [
  { x: 6.5, z: Z.north, width: 0.9, rot: 0, label: '현관' },
  { x: X.kitchen, z: 1.35, width: 0.8, rot: Math.PI / 2, label: '침실-2' },
  { x: X.bath, z: 1.35, width: 0.7, rot: Math.PI / 2, label: '욕실' },
  { x: X.bath, z: 3.2, width: 0.8, rot: Math.PI / 2, label: '침실-1' },
  { x: X.in, z: 4.0, width: 1.2, rot: Math.PI / 2, label: '발코니(주방)' },
  { x: X.in, z: 1.35, width: 1.2, rot: Math.PI / 2, label: '발코니(침2)' },
]

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  address: '서울특별시 송파구 백제고분로18길 8-17',
}

export const SCENE_CENTER = { x: X.east / 2, z: Z.north / 2 }
