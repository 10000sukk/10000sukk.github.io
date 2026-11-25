---
title: "Go 바이너리 하나에 웹앱 전체를 넣기"
description: "React 빌드 결과를 go:embed 로 실행 파일에 넣었다. 서버에 필요한 건 실행 파일 하나와 MySQL 뿐이다."
date: 2026-08-16
tags: [프로젝트, 자산 트래커]
cover: /covers/asset-tracker-go.png
---

집에서 쓰는 자산 기록 앱을 맥미니에 올렸다. 매주 계좌별 숫자를 한 번 입력하면 이력과 추이 그래프를 보여 주는 앱이다.

## 실행 파일 하나

프론트는 React 로 만들었다. 빌드 결과(`dist`)는 `go:embed` 로 Go 바이너리 안에 넣었다.

```go
//go:embed all:dist
```

DB 마이그레이션 파일도 같은 방식으로 넣었다. 그래서 배포할 때 정적 파일 폴더를 따로 옮길 일이 없다. 필요한 건 실행 파일 하나와 MySQL 뿐이다.

## 배포는 한 줄

```bash
git pull && make deploy
```

`make deploy` 는 빌드, 마이그레이션, LaunchAgent 재시작까지 하고 `/login` 이 응답할 때까지 기다린다. 응답이 오면 끝난다.
