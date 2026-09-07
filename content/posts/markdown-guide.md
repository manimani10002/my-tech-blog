---
title: "코드와 생각을 함께 담는 Markdown 작성법"
description: "제목, 코드 블록, 표와 인용문까지. 기술 글을 작성할 때 사용하는 기본 문법을 정리합니다."
date: "2026-09-06"
tags: ["Markdown", "글쓰기"]
---

> Markdown 렌더링을 확인하기 위한 예시 글입니다.

## 제목과 문단

본문의 큰 제목에는 `##`, 작은 제목에는 `###`을 사용합니다. 문단 사이에는 빈 줄을 넣습니다. **강조할 내용**은 별표 두 개로 감쌉니다.

## 코드 예제

짧은 코드는 `const message = 'hello'`처럼 표시할 수 있습니다. 여러 줄 코드는 코드 블록에 넣습니다.

```typescript
function greet(name: string) {
  return '안녕하세요, ' + name + '님!';
}

console.log(greet('개발자'));
```

## 표로 비교하기

| 항목 | 역할 |
| --- | --- |
| Markdown | 글 본문 작성 |
| GitHub | 파일과 수정 이력 관리 |
| Next.js | 글을 웹 페이지로 표시 |

## 발행 전 확인

- [x] 제목과 요약 작성
- [x] 코드 예제 확인
- [ ] 나만의 내용으로 바꾸기

이미지는 `public/images` 폴더에 넣고 `![이미지 설명](/images/example.png)` 형식으로 연결할 수 있습니다.
