# 10000sukk.github.io

Astro 로 만든 개인 블로그. `master` 에 push 하면 GitHub Actions 가 빌드해서 GitHub Pages 에 배포한다.

## 로컬에서 보기

```bash
npm install
npm run dev      # http://localhost:4321 — 초안(draft)도 보인다
npm run build    # dist/ — 실제 배포본, 초안은 빠진다
```

## 글 쓰기

`src/content/posts/<주소>.md` 파일을 만든다. 파일 이름이 글 주소가 된다 (`/posts/<주소>/`).

```markdown
---
title: "글 제목"
description: "목록과 검색 결과에 보일 한두 줄 요약"
date: 2026-11-25
tags: [macOS, Swift]      # 첫 번째 태그의 홈 섹션에 나온다. 태그 페이지에는 전부 나온다.
featured: [macOS]         # (선택) 이 태그의 대표 글로 지정. 없으면 그 태그의 최신 글이 대표.
cover: /covers/snipboard.png   # (선택) public/covers/ 에 넣은 이미지
draft: true               # (선택) true 면 로컬에서만 보이고 배포되지 않는다
---

본문은 마크다운으로.
```

## 규칙

- 홈: 태그(글의 첫 번째 태그)마다 섹션 하나. 가장 최근 글이 올라온 태그가 위로 온다.
- 섹션: 대표 글 1개 + 그 태그의 최신 글 3개 + `더 보기` → `/tags/<태그>/` (최신순, 10개씩 페이지).
- 왼쪽 메뉴의 태그 목록은 철자 순서. 메뉴는 접을 수 있고 상태가 기억된다.
- 설정값(사이트 이름, 섹션당 글 수, 페이지 크기)은 `src/consts.ts`.
- 글은 `sukk:blog-post` 스킬(10000sukk/agent-plugins)로 쓰면 초안 → 미리보기 → 배포까지 이어서 할 수 있다.
