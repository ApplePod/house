# 201호 집꾸미기

잠실동 201호 평면도와 실측 스케치를 비교하는 웹사이트입니다.

## 기능

- **비교 보기** — 공식 건축물현황도 ↔ Archisketch 실측 스케치 슬라이더 비교
- **공식 평면도** — 발급받은 건축물현황도 원본
- **실측 스케치** — 직접 실측한 Archisketch 평면도 (손글씨 메모 포함)
- **공간별** — 방별 클릭하여 실측 메모·꾸미기 계획 확인

## 로컬 실행

```bash
npm install
npm run dev
```

## 배포 (GitHub Pages)

```bash
npm run build
# dist 폴더를 gh-pages 브랜치에 배포
```

배포 URL: https://applepod.github.io/house/

## 사진 추가하기

`public/assets/` 폴더에 공간별 사진을 추가하고 `src/data/house.ts`에서 연결하면 됩니다.
