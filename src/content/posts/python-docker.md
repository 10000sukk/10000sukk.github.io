---
title: "파이썬 서비스 Dockerfile 에 꼭 넣는 세 줄"
description: "로그가 안 보이고, 시간이 9시간 어긋나고, 컨테이너가 root 로 돈다. 셋 다 한 줄씩이면 막을 수 있다."
date: 2026-06-01
tags: [프로젝트, 쇼츠 생성기]
cover: /covers/python-docker.png
---

FastAPI 서버를 컨테이너로 올릴 때 매번 넣는 줄들이 있다.

```dockerfile
ENV PYTHONUNBUFFERED=1
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN groupadd -r deploy && useradd -s /usr/sbin/nologin -r -m -g deploy deploy
USER deploy
```

## 왜 필요한가

- **`PYTHONUNBUFFERED=1`**: 이게 없으면 `print` 가 버퍼에 쌓여서 로그가 늦게, 혹은 안 보인다.
- **시간대**: 컨테이너는 기본이 UTC 다. 로그와 스케줄이 9시간 어긋나는 걸 한 번 겪으면 넣게 된다.
- **root 아닌 사용자**: 로그인 셸이 없는 전용 사용자로 돌린다. 뚫리더라도 피해를 줄인다.

## 실행

```dockerfile
ENTRYPOINT ["python", "-m", "uvicorn", "shorts_generator.main:app", \
            "--host", "0.0.0.0", "--port", "8080", \
            "--proxy-headers", "--forwarded-allow-ips", "*", "--workers", "4"]
```

리버스 프록시 뒤에 둘 거라 `--proxy-headers` 를 켰다. 그래야 클라이언트 IP 와 https 여부가 제대로 넘어온다.
