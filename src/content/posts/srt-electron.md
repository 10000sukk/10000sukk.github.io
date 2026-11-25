---
title: "처음 만든 데스크톱 앱, Electron"
description: "기차표 취소표를 기다리다 지쳐서 만든 작은 데스크톱 앱. Electron 과 React, 그리고 자동 업데이트."
date: 2024-05-26
category: 프로젝트
cover: /covers/srt-electron.png
---

명절 기차표 취소표를 새로고침하며 기다리다가 지쳐서 만든 앱이다. 처음 만든 데스크톱 앱이기도 하다.

## 구성

- `electron-vite` 템플릿으로 시작했다. React + TypeScript 다
- 화면은 renderer, 실제 작업은 main 프로세스에서 하고, 둘 사이는 preload 로 좁게 열었다
- 브라우저 조작은 Puppeteer 로 했다
- `electron-builder` 로 Windows·macOS·Linux 용으로 빌드한다

## 자동 업데이트

같이 쓰는 사람한테 새 버전을 매번 파일로 보내기 귀찮았다. 그래서 `electron-updater` 를 붙였다. 한 번 깔아 두면 알아서 최신 버전이 된다.

웹만 하던 사람도 익숙한 도구로 데스크톱 앱을 만들 수 있다는 게 Electron 의 장점이었다. 대신 앱 크기는 각오해야 한다.
