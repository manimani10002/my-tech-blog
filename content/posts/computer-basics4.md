---
title: '컴퓨터 기초 시리즈(4)'
description: '4편. Python과 JavaScript는 어떻게 실행될까? + Ubuntu에서 직접 확인하기'
date: '2026-09-07'
tags: ['CS']
draft: false
---

지금까지 다음 흐름을 살펴봤다.

```text
Source Code
 ↓
Executable
 ↓
Process
 ↓
Memory
 ↓
CPU
 ↓
Machine Code
```

그런데 우리가 사용하는 언어가 항상 C처럼 동작하는 것은 아니다.

대표적으로 Python과 JavaScript는 실행 과정에 **가상머신 또는 실행 엔진**이라는 계층이 존재한다.

이번 글에서는 이 구조를 살펴본 뒤, 지금까지 공부한 내용을 Linux 환경에서 실제 명령어로 확인해본다.

---

## 1. 여기서 말하는 VM은 무엇일까?

VM이라고 하면 VMware나 VirtualBox를 떠올릴 수 있다.

하지만 여기서 말하는 VM은 운영체제를 통째로 가상화하는 System VM이 아니다.

특정 프로그래밍 언어를 실행하기 위한 **Process VM**이다.

예를 들어

```text
Python → Python VM
JavaScript → V8
```

같은 구조다.

기본 개념은 다음과 같이 볼 수 있다.

```text
Source Code
    ↓
Virtual Machine
    ↓
실제 Machine Code
    ↓
CPU
```

VM은 언어의 명령과 실제 CPU 명령 사이에서 중간 계층 역할을 한다.

---

## 2. Python 실행 흐름

다음 Python 코드를 보자.

```python
a = 3
b = 5
c = a + b
print(c)
```

문서에서 설명하는 실행 과정은 다음과 같다.

```text
Python Source
      ↓
Parsing
      ↓
AST
      ↓
Compile
      ↓
Bytecode
      ↓
PVM
      ↓
실제 실행
```

Python 소스는 내부적으로 Bytecode라는 중간 명령어 형태로 변경된다.

---

## 3. Python Bytecode

문서에서는 `dis`를 통해 Bytecode를 직접 확인하는 예제를 소개한다.

```python
import dis

def f():
    a = 3
    b = 5
    c = a + b
    print(c)

dis.dis(f)
```

Bytecode에는 문서 예시 기준으로

```text
LOAD_CONST
STORE_FAST
LOAD_FAST
BINARY_ADD
```

등과 같은 명령이 존재한다.

CPU의 `mov`, `add`가 아니라 Python VM이 이해하는 명령어다.

---

## 4. PVM은 Stack 기반으로 동작한다

문서에서는 Python VM을 **Stack-based VM**으로 설명한다.

예를 들어 `3 + 5`는 개념적으로 다음처럼 처리된다.

```text
LOAD 3

Stack
[3]

LOAD 5

Stack
[3, 5]

ADD

Stack
[8]
```

PVM이 사용하는 Stack은 CPU의 `eax`, `ebx` 같은 실제 레지스터와는 다른 가상 실행 구조다.

---

## 5. 그렇다면 실제 계산은 PVM이 할까?

아니다.

문서에서 가장 중요한 부분 중 하나다.

PVM은 Bytecode를 해석하고, 이에 대응하는 CPython 내부 C 함수를 호출한다.

```text
Python Bytecode
      ↓
PVM
      ↓
CPython의 C 함수
      ↓
이미 컴파일된 Machine Code
      ↓
실제 CPU
```

즉 최종 덧셈은 결국 실제 CPU의 ALU에서 이루어진다.

---

## 6. JavaScript의 V8

JavaScript에서는 Chrome과 Node.js에서 사용하는 V8을 예로 들 수 있다.

문서의 실행 흐름은 다음과 같다.

```text
JavaScript Source
      ↓
Parsing
      ↓
AST
      ↓
Ignition
      ↓
Bytecode
      ↓
실행
```

여기까지 보면 Python과 비슷해 보인다.

하지만 V8에는 중요한 차이가 있다.

---

## 7. JIT — Just-In-Time Compile

V8은 반복적으로 실행되는 코드를 관찰한다.

자주 실행되는 코드를

```text
Hot Code
```

라고 한다.

Hot Code가 발견되면 문서에서는 TurboFan이 이를 최적화된 기계어로 변경한다고 설명한다.

```text
JavaScript
 ↓
Bytecode
 ↓
Ignition
 ↓
Hot Code 감지
 ↓
TurboFan
 ↓
Machine Code
 ↓
CPU
```

---

## 8. 예제로 보기

```javascript
function add(a, b) {
    return a + b;
}

for (let i = 0; i < 100000; i++) {
    add(i, i + 1);
}
```

처음에는 Ignition이 코드를 실행한다.

하지만 `add()`가 계속 반복되고 같은 형태의 값이 들어온다는 정보가 쌓이면 V8이 최적화를 수행할 수 있다.

```text
반복 실행
 ↓
Type 정보 수집
 ↓
Hot Code
 ↓
TurboFan
 ↓
Optimized Machine Code
```

이후에는 최적화된 기계어를 CPU가 실행한다.

---

## 9. Deoptimization

JavaScript는 동적 타입 언어다.

만약 V8이 숫자가 계속 들어온다고 가정해서 최적화했는데 갑자기 다른 형태의 값이 들어오면 기존 최적화를 그대로 사용할 수 없는 경우가 있다.

문서에서는 이런 경우 최적화된 코드를 버리고 안전한 실행 방식으로 돌아가는 것을

```text
Deoptimization
```

이라고 설명한다.

---

## 10. Python과 V8 비교

문서 내용을 기준으로 간단히 비교하면 다음과 같다.

| 구분     | Python / CPython | JavaScript / V8 |
| ------ | ---------------- | --------------- |
| 중간 표현  | Bytecode         | Bytecode        |
| 기본 실행  | PVM              | Ignition        |
| JIT    | 문서 설명 기준 없음      | TurboFan        |
| 메모리 관리 | 자동               | 자동              |
| 최종 계산  | CPU              | CPU             |

결국 중요한 것은

> VM도 결국 CPU 위에서 실행되는 소프트웨어다.

라는 점이다.

---

# 이제 실제로 확인해보자

지금까지 내용은 이론이었다.

문서에서는 Ubuntu에서 컴파일과 실행 과정을 직접 확인할 수 있는 여러 도구를 소개한다.

먼저 필요한 도구를 설치한다.

```bash
sudo apt update
sudo apt install build-essential gdb strace ltrace binutils
```

---

## 11. gcc로 컴파일 단계를 직접 보기

예제 코드:

```c
#include <stdio.h>

int main() {
    int a = 3;
    int b = 5;
    int c = a + b;

    printf("%d\n", c);

    return 0;
}
```

---

### Preprocessing

```bash
gcc -E add.c -o add.i
```

---

### Compilation

```bash
gcc -S add.i -o add.s
```

---

### Assembly

```bash
gcc -c add.s -o add.o
```

---

### Linking

```bash
gcc add.o -o add
```

이렇게 실행하면 1편에서 배운

```text
.c
→ .i
→ .s
→ .o
→ 실행파일
```

을 직접 확인할 수 있다.

---

## 12. objdump — 실행파일을 다시 Assembly로 보기

```bash
objdump -d add
```

실행파일을 역어셈블하면 실제 CPU 명령어를 확인할 수 있다.

예를 들어

```text
mov
add
call
```

같은 명령어가 나타난다.

우리가 작성한

```c
c = a + b;
```

가 실제로 어떤 명령어가 되었는지 확인할 수 있는 것이다.

---

## 13. readelf — ELF 구조 확인

Linux 실행파일의 ELF 정보를 확인할 수 있다.

```bash
readelf -h add
```

Header 확인.

```bash
readelf -S add
```

Section 확인.

예를 들어

```text
.text
.data
.bss
```

같은 정보를 확인할 수 있다.

---

## 14. nm — Symbol 확인

```bash
nm add
```

함수와 변수의 Symbol을 확인할 수 있다.

`printf` 같은 외부 함수가 어떻게 표시되는지도 확인 가능하다.

---

## 15. strace — System Call 추적

운영체제와 프로그램 사이의 상호작용을 보고 싶다면 `strace`를 사용할 수 있다.

```bash
strace ./add
```

문서 예시에서는 다음과 같은 출력이 등장한다.

```text
write(1, "8\n", 2)
```

해석하면

```text
write(
    1,
    "8\n",
    2
)
```

이다.

`1`은 표준 출력이고 `"8\n"`이라는 데이터를 2바이트 출력한다는 의미다.

즉

```c
printf("%d\n", c);
```

가 OS 수준에서는 실제 System Call과 연결된다는 것을 확인할 수 있다.

---

## 16. ltrace — Library Function 추적

```bash
ltrace ./add
```

`ltrace`는 `printf()` 같은 Library Function 호출을 추적한다.

`strace`가 System Call 레벨이라면 `ltrace`는 그보다 높은 Library Function 레벨을 확인하는 데 사용된다.

---

## 17. gdb — 프로그램 안으로 들어가기

가장 직접적인 방법은 GDB다.

먼저 디버깅 정보를 포함해 컴파일한다.

```bash
gcc -g add.c -o add_debug
```

그리고 실행한다.

```bash
gdb ./add_debug
```

주요 명령어는 다음과 같다.

```text
break main
run
next
print a
print b
print c
info registers
stepi
x/i $pc
continue
```

---

## 18. stepi가 특히 중요한 이유

```text
stepi
```

는 Assembly Instruction 한 개 단위로 실행한다.

예를 들어

```asm
add eax, ebx
```

전후의 Register 값을 확인하면 실제 값이 어떻게 변경되는지 볼 수 있다.

```text
실행 전

eax = 3
ebx = 5

↓

stepi

↓

실행 후

eax = 8
```

우리가 3편에서 공부한 CPU 명령어 실행 결과를 프로그램 레벨에서 간접적으로 관찰할 수 있다.

---

# C 문법을 컴퓨터 구조와 연결해보기

문서 마지막 부분은 지금까지의 내용을 C 문법과 연결한다.

---

## 지역 변수

```c
int a = 3;
```

프로세스 메모리의 Stack과 연결해서 이해할 수 있다.

---

## 동적 메모리

```c
int *arr = malloc(sizeof(int) * 3);
```

Heap에서 공간을 확보한다.

사용이 끝나면

```c
free(arr);
```

를 호출해야 한다.

그렇지 않으면 메모리 누수가 발생할 수 있다.

---

## 포인터

```c
int x = 10;
int *ptr = &x;
```

`ptr`은 `x`의 메모리 주소를 저장한다.

```c
*ptr = 20;
```

을 실행하면 해당 주소에 직접 접근해 `x`의 값을 변경한다.

포인터는 우리가 앞서 계속 이야기한 **메모리 주소**를 언어 수준에서 직접 다룰 수 있게 한다.

---

## 함수 호출

```c
add(a, b);
```

함수 호출은 Stack과 연결된다.

함수를 실행한 뒤 어디로 돌아갈지에 대한 복귀 정보 등이 Stack과 관련된다.

---

## printf

```c
printf("Hello");
```

는 System Call을 통해 운영체제의 기능과 연결된다.

즉 C 문법을 단순한 문법으로만 볼 필요는 없다.

```text
변수
→ Stack

malloc
→ Heap

Pointer
→ Memory Address

Function Call
→ Stack

printf
→ System Call
```

앞에서 공부한 컴퓨터 구조와 직접 연결된다.

---

# 시리즈 마무리

처음에는 단순한 코드 한 줄에서 시작했다.

```c
int c = a + b;
```

하지만 실제 컴퓨터에서는 이 한 줄 뒤에 수많은 계층이 존재한다.

```text
Source Code

      ↓

Compiler / Interpreter

      ↓

Executable / Bytecode

      ↓

Operating System

      ↓

Process

      ↓

Memory

      ↓

CPU

      ↓

Machine Code

      ↓

Control Unit

      ↓

ALU

      ↓

Logic Gate

      ↓

Transistor
```

C, Python, JavaScript는 실행 과정에 차이가 있다.

하지만 최종적으로는 모두 실제 CPU 위에서 실행된다.

이번 시리즈를 정리하면서 가장 중요하게 볼 부분은 개별 용어를 암기하는 것이 아니라 **전체 흐름을 연결해서 이해하는 것**이다.

```text
코드
→ 실행환경
→ 운영체제
→ 프로세스
→ 메모리
→ CPU
→ 기계어
→ 하드웨어
```

컴파일러, 운영체제, 프로세스, 가상머신, CPU는 서로 떨어져 있는 개념이 아니다.

모두 결국 하나의 질문으로 연결된다.

> **“내가 작성한 코드는 실제 컴퓨터에서 어떻게 실행되는가?”**

이 질문을 위에서 아래까지 따라가 보는 것이 이번 4편 시리즈의 핵심이다.