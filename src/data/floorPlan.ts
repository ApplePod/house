/**
 * 201호 건축물현황도 (1:100) — 공식 치수 그대로
 *
 *  가로: 1100(발코니) + 2700 + 1400 + 3500 = 8700mm (실내 7600)
 *  세로: 2700 + 2700 = 5400mm (좌측) / 침실-1 깊이 4000mm (남쪽 확장 포함)
 *
 *  Z=5.4  [발코니][  주방  ][      거실       ]
 *  Z=2.7  [발코니][침실-2  ][욕실][   (거실)   ]
 *  Z=0    [발코니][        ][     ][  침실-1    ]
 *  Z=-1.3 [                      ][  확장(베란다)]  ← 침실-1만 1300mm
 *
 *  · 발코니: 좌측 1100×5400 (주방+침실-2), 확장 없음
 *  · 침실-1: 우하 3500×4000 = 13㎡, 남쪽 베란다 흡수
 */

export const WALL_HEIGHT = 2.4
export const WALL_THICKNESS = 0.12
export const BALCONY_STEP = 0.16

export const D = {
  balconyW: 1.1,
  wKitchen: 2.7,
  wBath: 1.4,
  wBed1: 3.5,
  hRow: 2.7,
  bed1Ext: 1.3,
} as const

export const X = {
  bal: 0,
  in: D.balconyW,
  k: D.balconyW + D.wKitchen,
  bath: D.balconyW + D.wKitchen + D.wBath,
  east: D.balconyW + D.wKitchen + D.wBath + D.wBed1,
} as const

export const Z = {
  ext: -D.bed1Ext,
  s: 0,
  mid: D.hRow,
  n: D.hRow * 2,
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

export const UNIT = { width: X.east, depth: Z.n - Z.ext }

export const rooms3d: Room3D[] = [
  {
    id: 'balcony',
    name: '발코니',
    area: '6㎡',
    color: '#7ec8a0',
    floor: [
      [X.bal, Z.s],
      [X.in, Z.s],
      [X.in, Z.n],
      [X.bal, Z.n],
    ],
    notes: ['1100×5400mm', '주방·침실-2 옆', '확장 없음', '침실-1 쪽은 없음(잘림)'],
  },
  {
    id: 'kitchen',
    name: '주방',
    area: '7㎡',
    color: '#f4a261',
    floor: [
      [X.in, Z.mid],
      [X.k, Z.mid],
      [X.k, Z.n],
      [X.in, Z.n],
    ],
    notes: ['2700×2700mm', '발코니 확장 없음', '싱크·가스레인지'],
  },
  {
    id: 'living',
    name: '거실',
    area: '13㎡',
    color: '#e9c46a',
    floor: [
      [X.k, Z.mid],
      [X.east, Z.mid],
      [X.east, Z.n],
      [X.k, Z.n],
    ],
    notes: ['4900×2700mm', '주방 오픈', '201호 현관'],
  },
  {
    id: 'bedroom2',
    name: '침실-2',
    area: '7㎡',
    color: '#90be6d',
    floor: [
      [X.in, Z.s],
      [X.k, Z.s],
      [X.k, Z.mid],
      [X.in, Z.mid],
    ],
    notes: ['2700×2700mm', '발코니 옆', '확장 없음'],
  },
  {
    id: 'bathroom',
    name: '욕실',
    area: '4㎡',
    color: '#577590',
    floor: [
      [X.k, Z.s],
      [X.bath, Z.s],
      [X.bath, Z.mid],
      [X.k, Z.mid],
    ],
    notes: ['1400×2700mm'],
  },
  {
    id: 'bedroom1',
    name: '침실-1',
    area: '13㎡',
    color: '#43aa8b',
    floor: [
      [X.bath, Z.s],
      [X.east, Z.s],
      [X.east, Z.mid],
      [X.bath, Z.mid],
    ],
    raisedSection: {
      floor: [
        [X.bath, Z.ext],
        [X.east, Z.ext],
        [X.east, Z.s],
        [X.bath, Z.s],
      ],
      height: BALCONY_STEP,
    },
    notes: ['3500×4000mm', '✅ 남쪽 베란다 확장', '단차 16cm', '스타일러·붙박이장'],
  },
]

export const walls: [number, number, number, number][] = [
  // 외벽 — 남쪽 (침실-1 확장부)
  [X.bal, Z.s, X.bath, Z.s],
  [X.bath, Z.ext, X.east, Z.ext],
  [X.east, Z.ext, X.east, Z.s],
  // 외벽 — 동·북·서
  [X.east, Z.s, X.east, Z.n],
  [X.east, Z.n, X.bal, Z.n],
  [X.bal, Z.n, X.bal, Z.s],
  // 발코니 ↔ 실내 (전장 5400, 확장 없음)
  [X.in, Z.s, X.in, Z.n],
  // 내부 가로벽 z=2.7
  [X.in, Z.mid, X.east, Z.mid],
  // 내부 세로벽
  [X.k, Z.s, X.k, Z.mid],
  [X.bath, Z.s, X.bath, Z.mid],
  // 침실-1 확장부 서측
  [X.bath, Z.ext, X.bath, Z.s],
]

export const doors: { x: number; z: number; width: number; rot: number; label: string }[] = [
  { x: 6.2, z: Z.n, width: 0.9, rot: 0, label: '현관' },
  { x: X.k, z: 1.35, width: 0.8, rot: Math.PI / 2, label: '침실-2' },
  { x: X.bath, z: 1.35, width: 0.7, rot: Math.PI / 2, label: '욕실' },
  { x: X.bath, z: 0.6, width: 0.8, rot: Math.PI / 2, label: '침실-1' },
  { x: X.in, z: 4.0, width: 1.2, rot: Math.PI / 2, label: '발코니' },
]

export const houseInfo = {
  title: '201호 집꾸미기',
  unit: '201호',
  address: '서울특별시 솑파구 백제고분로18길 8-17',
}

export const SCENE_CENTER = { x: X.east / 2, z: (Z.n + Z.ext) / 2 }
