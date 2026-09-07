# 태현의 기술 블로그

Next.js App Router, Tailwind CSS, Markdown 기반 개인 기술 블로그입니다. DB 없이 글 파일을 커밋하고 배포합니다.

## WSL Ubuntu에서 실행

```bash
cd /home/rinma/proj/my-tech-blog
npm ci
npm run dev
```

Windows 브라우저에서 http://localhost:3000 으로 접속합니다.

## 글 작성

`content/posts/my-first-post.md`처럼 영문 소문자와 하이픈으로 파일을 만듭니다.

```markdown
---
title: "글 제목"
description: "목록에 표시할 요약"
date: "2026-09-07"
tags: ["Next.js", "개발"]
draft: false
---

## 본문 제목

여기에 글을 작성합니다.
```

- 파일 이름이 주소가 됩니다: `/posts/my-first-post`.
- `draft: true`이면 목록과 상세 페이지에서 제외됩니다.
- 날짜는 `YYYY-MM-DD` 형식입니다. 글은 날짜 내림차순으로 정렬됩니다.
- 제목, 요약, 태그를 검색하고 태그별로 필터링할 수 있습니다.
- 표, 체크리스트, 코드 블록을 지원합니다. 코드 구문 색상 강조와 MDX는 아직 지원하지 않습니다.
- 이미지는 `public/images`에 넣고 `![설명](/images/파일명.png)`으로 연결합니다.
- 포함된 글 2개는 예시이므로 실제 운영 전에 수정하거나 삭제하세요.
- GitHub에 푸시하면 연결된 Vercel 자동 배포를 통해 반영됩니다. 웹 편집기는 포함하지 않습니다.

## 검증

```bash
npm run lint
npm run build
```

블로그 소개는 `app/about/page.tsx`, 공통 헤더는 `app/layout.tsx`, 화면 스타일은 `app/globals.css`에서 수정합니다.
