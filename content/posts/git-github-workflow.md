---
title: 'GitHub 사용 가이드: 초보자를 위한 팀 협업 Git Workflow'
description: 'IDE 터미널과 GitHub 웹을 오가며 dev 브랜치 최신화부터 작업 브랜치 생성, Pull Request, Merge와 브랜치 정리까지 진행하는 흐름을 정리합니다.'
date: '2026-09-07'
tags: ['Git', '협업']
draft: false
---

팀 프로젝트에서 GitHub를 사용하다 보면 IDE 터미널과 GitHub 웹사이트를 번갈아 사용하게 됩니다. 브랜치 생성, 코드 작성, 커밋과 Push는 주로 IDE에서 진행하고, Pull Request 생성과 코드 리뷰, Merge는 GitHub 웹에서 진행합니다.

처음 Git을 사용할 때는 명령어를 입력할 위치와 작업 순서가 헷갈릴 수 있습니다. 이 글에서는 `dev`를 공통 개발 브랜치로 사용하는 팀을 기준으로 로그인 API 기능을 개발하고 Pull Request를 통해 `dev`에 반영하는 전체 흐름을 정리합니다.

## 로컬 저장소와 원격 저장소

내 컴퓨터의 Git 저장소와 GitHub의 저장소는 서로 다른 공간입니다.

```text
내 컴퓨터                           GitHub

Local Repository                   Remote Repository

dev                                origin/dev
feat/login-api      <- Push/Pull -> feat/login-api
```

내 컴퓨터에서 파일을 수정하거나 커밋해도 GitHub에 바로 반영되지는 않습니다. 반대로 GitHub에서 다른 팀원의 코드가 Merge되어도 내 컴퓨터의 코드가 자동으로 최신 상태가 되지는 않습니다.

두 공간의 변경 사항을 주고받을 때는 다음 명령어를 사용합니다.

```text
git pull  # GitHub에서 내 컴퓨터로 가져오기
git push  # 내 컴퓨터에서 GitHub로 올리기
```

`git pull`은 원격 저장소의 변경 사항을 가져와 현재 브랜치에 반영하고, `git push`는 로컬 커밋을 원격 저장소에 업로드합니다.

## 전체 작업 흐름

로그인 API 연결 기능을 개발한다면 일반적으로 다음 순서로 진행합니다.

1. [IDE 터미널] `dev`로 이동하고 최신 코드 받기
2. [IDE 터미널] 작업 브랜치 생성
3. [IDE 코드 편집기] 기능 개발
4. [IDE 터미널] 변경 사항 확인 및 커밋
5. [IDE 터미널] 최신 `dev`를 작업 브랜치에 반영
6. [IDE 터미널] 작업 브랜치를 GitHub에 Push
7. [GitHub 웹] Pull Request 생성
8. [GitHub 웹] 코드 리뷰 및 수정 요청 반영
9. [GitHub 웹] `dev`에 Merge
10. [IDE 터미널] 로컬 `dev` 최신화 및 작업 브랜치 삭제

## 1. 최신 `dev`에서 작업 시작하기

### 현재 브랜치 확인

작업을 시작하기 전에 현재 브랜치를 확인합니다.

```bash
git branch
```

`*`가 붙은 브랜치가 현재 내가 위치한 브랜치입니다.

```text
* feat/signup
  dev
```

### `dev`로 이동하고 최신화

공통 개발 브랜치인 `dev`로 이동한 다음 GitHub의 최신 변경 사항을 받습니다.
이동하기 전에 `git status`로 커밋하지 않은 변경 사항이 없는지 확인합니다.

```bash
git switch dev
git pull origin dev
```

`origin`은 GitHub 원격 저장소의 기본 이름입니다. 따라서 `git pull origin dev`는 GitHub의 `origin/dev`를 로컬 `dev`에 반영한다는 뜻입니다.

기본 설정에서 `git pull`은 다음 두 작업을 합친 명령으로 이해할 수 있습니다.
다만 Git 설정이나 옵션에 따라 `merge` 대신 `rebase`를 수행할 수도 있습니다.

```text
git pull ~= git fetch + git merge (기본 설정)
```

### 작업 브랜치 생성

`dev`에서 직접 개발하지 않고, 최신 `dev`를 기준으로 작업 브랜치를 만듭니다.

```bash
git switch -c feat/login-api dev
```

이 명령은 `dev`에서 `feat/login-api`를 생성하고 동시에 그 브랜치로 이동합니다.

```text
dev
A - B
     \
      C  <- feat/login-api
```

브랜치 이름은 팀 규칙을 우선하되, 작업 목적을 알아보기 쉽게 작성합니다.

| 접두사     | 의미           | 예시                   |
| ---------- | -------------- | ---------------------- |
| `feat`     | 새로운 기능    | `feat/login-api`       |
| `fix`      | 버그 수정      | `fix/signup-error`     |
| `refactor` | 코드 구조 개선 | `refactor/auth-module` |
| `docs`     | 문서 수정      | `docs/readme`          |
| `style`    | 코드 포맷팅 등 | `style/code-format`    |

## 2. 기능 개발과 커밋

이제 `feat/login-api` 브랜치에서 코드를 작성합니다. 파일을 생성하거나 기존 코드를 수정해도 이 시점에는 GitHub에 변화가 생기지 않습니다.

개발이 끝나면 먼저 변경된 파일을 확인합니다.

```bash
git status
```

필요한 변경만 staging area에 추가합니다. `git add .`은 현재 디렉터리와 하위 디렉터리의 변경 사항을 모두 추가하므로, 실행한 뒤 반드시 포함 내용을 확인하는 것이 좋습니다.

```bash
git add .
git status
git diff --cached
```

확인 결과가 의도한 변경이라면 커밋합니다.

```bash
git commit -m "feat: 로그인 API 연결"
```

커밋은 현재 작업 내용을 하나의 기록 단위로 저장하는 작업입니다. 예를 들어 다음처럼 작업 목적이 드러나는 메시지를 사용합니다.

```text
feat: 로그인 API 연결
fix: 로그인 실패 시 에러 처리 수정
refactor: 인증 로직 분리
docs: 로그인 API 문서 추가
```

여기까지는 로컬 저장소에만 기록된 상태입니다. GitHub에 올리려면 별도의 `git push`가 필요합니다.

## 3. 최신 `dev`를 작업 브랜치에 반영하기

개발하는 동안 다른 팀원의 Pull Request가 Merge되었을 수 있습니다. 따라서 PR을 만들기 전에 최신 `dev`를 작업 브랜치에 반영합니다.

먼저 작업 내용이 모두 커밋되었는지 확인합니다.

```bash
git status
```

가능하면 다음과 같이 작업 트리가 깨끗한 상태에서 브랜치를 이동합니다.

```text
nothing to commit, working tree clean
```

그 다음 로컬 `dev`를 최신화하고 작업 브랜치에 Merge합니다.

```bash
git switch dev
git pull origin dev
git switch feat/login-api
git merge dev
```

작업 중 다른 팀원이 `D`를 `dev`에 Merge했다면, 작업 브랜치에도 `D`를 반영하는 과정입니다.

```text
dev
A - B - D
     \
      C - M  <- feat/login-api
```

## 4. Merge Conflict 해결하기

같은 파일의 같은 부분을 서로 다르게 수정했다면 Git이 자동으로 병합하지 못하고 충돌을 표시합니다.

```bash
git status
```

충돌한 파일에는 다음과 같은 표시가 들어갑니다.

```text
<<<<<<< HEAD
내 작업 브랜치 코드
=======
dev 브랜치 코드
>>>>>>> dev
```

파일을 직접 수정해 최종적으로 사용할 코드만 남기고 `<<<<<<<`, `=======`, `>>>>>>>` 표시를 모두 삭제합니다. 해결한 파일을 다시 staging area에 추가한 뒤 Merge를 계속 진행합니다.

```bash
git add path/to/conflicted-file
git merge --continue
```

아직 해결할 수 없는 충돌이라면 Merge를 취소하고 Merge 직전 상태로 돌아갈 수 있습니다.

```bash
git merge --abort
```

## 5. Push 전 기능 확인

충돌을 해결했다고 바로 Push하지 말고 애플리케이션과 관련 검사를 실행합니다. `npm run dev`는 개발 서버를 계속 실행하므로 별도 터미널에서 실행하고, 린트와 빌드는 다른 터미널에서 실행합니다.

```bash
npm run dev
npm run lint
npm run build
```

프로젝트에 테스트가 있다면 `npm run test`도 실행합니다. Merge 과정에서 Git 충돌은 해결되었더라도 기능의 동작이나 빌드가 깨질 수 있으므로, 실제 실행 결과를 확인한 뒤 Push해야 합니다.

## 6. 작업 브랜치를 Push하고 Pull Request 만들기

처음 Push하는 작업 브랜치라면 원격 브랜치와 연결하면서 Push합니다.

```bash
git push -u origin feat/login-api
```

`-u` 옵션은 로컬 브랜치와 원격 브랜치의 추적 관계를 설정합니다. 이후 같은 브랜치에서는 다음 명령만 사용해도 됩니다.

```bash
git push
```

GitHub 저장소에 접속해 `Compare & pull request`를 클릭하거나 `Pull requests` → `New pull request`로 이동합니다. Pull Request의 방향을 다음처럼 설정합니다.

```text
base: dev
compare: feat/login-api
```

즉 `feat/login-api`의 변경 사항을 `dev`에 반영하겠다는 뜻입니다. PR 제목과 본문에는 작업 내용과 테스트 결과를 간단히 기록합니다.

```markdown
## 작업 내용

- 로그인 API 연결
- 로그인 실패 시 에러 메시지 처리
- 로그인 성공 시 메인 페이지 이동

## 테스트

- 정상 로그인 확인
- 잘못된 비밀번호 입력 확인
- 서버 오류 발생 시 에러 메시지 확인
```

내용을 확인한 뒤 `Create pull request`를 클릭합니다.

## 7. 코드 리뷰와 수정 사항 반영

팀원은 GitHub에서 Pull Request의 변경 내용을 검토합니다. 함수 분리, 에러 처리, 변수명 변경과 같은 수정 요청이 올 수 있습니다.

수정 요청이 있더라도 같은 작업 브랜치에서 수정하면 기존 Pull Request에 자동으로 반영됩니다. 새 PR을 만들 필요는 없습니다.

```bash
git branch
git status
git add .
git commit -m "fix: 리뷰 내용 반영"
git push
```

리뷰가 끝날 때까지 필요한 수정과 Push를 반복합니다.

## 8. Pull Request Merge하기

코드 리뷰가 완료되고 팀의 Merge 기준을 만족하면 GitHub에서 `Merge pull request`를 클릭합니다. 프로젝트 설정에 따라 다음 중 하나의 Merge 방식을 사용합니다.

- `Create a merge commit`
- `Squash and merge`
- `Rebase and merge`

어떤 방식을 사용할지는 팀 규칙을 따릅니다. Merge가 완료되면 GitHub의 `dev`에 작업 내용이 반영됩니다.

작업이 끝났다면 GitHub의 `Delete branch` 버튼으로 원격 작업 브랜치를 삭제할 수 있습니다. 저장소에서 Merge 후 자동으로 브랜치를 삭제하도록 설정할 수도 있습니다.

## 9. 로컬 `dev` 최신화와 브랜치 정리

GitHub에서 PR을 Merge해도 로컬 `dev`가 자동으로 최신화되지는 않습니다. 다시 IDE 터미널로 돌아와 다음 명령을 실행합니다.

```bash
git switch dev
git pull origin dev
```

이제 로컬 `dev`에도 방금 Merge된 기능이 반영됩니다. 작업 브랜치에 남겨둘 작업이 없다면 로컬 브랜치도 삭제합니다.

```bash
git branch -d feat/login-api
```

`-d`는 브랜치가 Merge되었는지 확인한 뒤 안전하게 삭제합니다. Squash Merge처럼 커밋 그래프가 달라진 경우에는 변경 내용이 이미 `dev`에 들어갔더라도 삭제가 거부될 수 있습니다. PR이 정상적으로 Merge되었고 보존할 작업이 없다는 것을 확인한 경우에만 다음처럼 강제 삭제합니다.

```bash
git branch -D feat/login-api
```

## 한 번에 보는 명령어 흐름

```bash
# 최신 dev 준비
git switch dev
git pull origin dev

# 작업 브랜치 생성
git switch -c feat/login-api dev

# ... 기능 개발 ...

# 변경 사항 확인 및 커밋
git status
git add .
git diff --cached
git commit -m "feat: 로그인 API 연결"

# 최신 dev 반영
git switch dev
git pull origin dev
git switch feat/login-api
git merge dev

# 충돌이 있다면 해결 후, 충돌을 해결한 파일만 추가
git add path/to/conflicted-file
git merge --continue

# 검사 후 Push
git push -u origin feat/login-api
```

이후 GitHub 웹에서 `base: dev`, `compare: feat/login-api`로 Pull Request를 만들고, 리뷰 수정이 있다면 같은 브랜치에 커밋과 Push를 반복합니다. Merge가 끝나면 로컬에서 정리합니다.

```bash
git switch dev
git pull origin dev
git branch -d feat/login-api
```

## IDE와 GitHub의 역할

| 작업                        | 위치                      |
| --------------------------- | ------------------------- |
| 코드 작성                   | IDE 코드 편집기           |
| 브랜치 확인과 이동          | IDE 터미널                |
| 브랜치 생성                 | IDE 터미널                |
| 최신 코드 Pull              | IDE 터미널                |
| 변경 사항 확인, Add, Commit | IDE 터미널                |
| Merge와 충돌 해결           | IDE 터미널 및 코드 편집기 |
| Push                        | IDE 터미널                |
| Pull Request 생성           | GitHub 웹                 |
| 코드 변경 내용 확인과 리뷰  | GitHub 웹                 |
| Pull Request Merge          | GitHub 웹                 |
| 원격 브랜치 삭제            | GitHub 웹 또는 IDE 터미널 |
| 로컬 브랜치 삭제            | IDE 터미널                |

간단히 말하면 IDE는 코드를 만들고 Git 기록을 관리하는 곳이고, GitHub는 팀원과 변경 사항을 공유하고 검토하고 병합하는 곳입니다.

## 자주 사용하는 명령어

```bash
# 현재 브랜치 확인
git branch

# 현재 작업 상태 확인
git status

# 원격 dev 받아오기
git pull origin dev

# 작업 브랜치 생성
git switch -c feat/login-api dev

# 변경 사항 스테이징
git add .

# 커밋할 변경 사항 확인
git diff --cached

# 커밋
git commit -m "feat: 로그인 API 연결"

# dev를 현재 브랜치에 병합
git merge dev

# 진행 중인 Merge 취소
git merge --abort

# 원격 저장소에 Push
git push -u origin feat/login-api
git push

# 커밋 기록 확인
git log --oneline

# 로컬 브랜치 삭제
git branch -d feat/login-api
```

## 정리

GitHub 협업에서 중요한 것은 모든 명령어를 외우는 것이 아니라 현재 작업 위치와 브랜치 상태를 확인하는 습관입니다.

```text
최신 dev를 받는다.
-> 작업 브랜치를 만든다.
-> 작업 브랜치에서 개발한다.
-> 커밋하고 Push한다.
-> Pull Request를 만든다.
-> 리뷰 내용을 반영한다.
-> dev에 Merge한다.
-> 다시 최신 dev를 받는다.
-> 작업 브랜치를 정리한다.
```

현재 브랜치가 헷갈리면 `git branch`, 변경 사항이 헷갈리면 `git status`를 먼저 실행합니다. 특히 `dev`에서 직접 기능을 개발하지 않고, 최신 `dev`를 기준으로 별도의 작업 브랜치를 만들어 작업하는 습관이 팀 협업의 기본입니다.
