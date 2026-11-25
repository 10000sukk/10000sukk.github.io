---
title: "같은 필기 앱을 Flutter 로 Android·Windows 에"
description: "Swift 앱은 그대로 두고, Android 와 Windows 용 앱을 Flutter 로 따로 만들었다. 공동작업은 CloudKit 을 직접 호출한다."
date: 2026-11-23
category: 프로젝트
tags: [King Note]
cover: /covers/kingnote-flutter.png
---

King Note 는 Swift 로 만든 Apple 전용 앱이다. 같이 쓰고 싶은 사람이 Android 와 Windows 를 쓰고 있어서, 두 플랫폼용 앱을 Flutter 로 따로 만들었다.

## 서버 없이 CloudKit

공동작업은 Apple 앱과 같은 CloudKit 컨테이너를 쓴다. 자체 서버는 두지 않고 앱에서 CloudKit Web Services 를 직접 부른다. Apple 로그인 화면만 플랫폼 WebView 를 쓴다. 로그인 토큰은 Android Keystore 와 Windows 보안 저장소에 넣고, SQLite·백업·로그에는 남기지 않는다.

## 획 단위로 합치기

두 사람이 같은 쪽에 동시에 쓰면 합쳐야 한다. Apple 앱과 같은 획 ID·좌표·논리 시계를 써서 서로 다른 획은 합친다. 같은 항목을 동시에 바꾸면 이력에 모두 남긴다. 삭제가 겹치면 삭제가 이긴다.

## 아직 남은 것

Apple 앱과 기능이 완전히 같지는 않다. 남은 건 점검표에 따로 적어 두고 하나씩 채우고 있다. 필기 곡선 같은 계산은 Swift 원본을 돌려 얻은 값과 비교해 맞춘다.
