---
title: '컴퓨터 기초 시리즈(3)'
description: '3편. CPU는 기계어를 어떻게 실제 계산으로 바꿀까?'
date: '2026-09-07'
tags: ['CS']
draft: false
---

앞선 글에서 프로그램이 실행되면 운영체제가 프로세스를 만들고 CPU에 실행 기회를 제공한다는 것을 살펴봤다.

이번에는 더 낮은 단계로 내려가보자.

```c
int c = a + b;
```

이 한 줄이 최종적으로 CPU 내부에서는 어떻게 실제 계산으로 바뀔까?

---

## 1. CPU가 이해하는 것은 기계어다

우리가 작성하는

```c
c = a + b;
```

는 최종적으로 어셈블리 명령어를 거쳐 기계어가 된다.

예를 들어

```asm
add eax, ebx
```

라는 어셈블리 명령어 역시 CPU 내부에서는 특정 비트 패턴일 뿐이다.

CPU는 이 비트의 구조를 자신의 명령어 집합 규칙에 따라 해석한다.

이를 문서에서는 **ISA(Instruction Set Architecture)**와 연결해 설명한다.

기계어에는 크게 다음 정보가 포함된다.

```text
Opcode
Operand
```

### Opcode

어떤 연산을 수행할 것인지 나타낸다.

```text
ADD
MOV
CMP
...
```

### Operand

어떤 값을 대상으로 연산할 것인지 나타낸다.

```text
eax
ebx
Memory Address
...
```

---

## 2. CPU 주요 구성 요소

CPU 내부의 핵심 구성요소는 다음과 같다.

| 구성 요소    | 역할                 |
| -------- | ------------------ |
| PC       | 다음 명령어 주소          |
| IR       | 현재 가져온 명령어         |
| CU       | 명령어를 해석하고 제어 신호 생성 |
| ALU      | 산술·논리 연산           |
| Register | CPU 내부의 빠른 저장공간    |
| Bus      | 주소·데이터·제어신호 전달     |
| Clock    | 동작 시점 동기화          |

이제 `add eax, ebx` 하나가 실행되는 과정을 살펴보자.

---

## 3. Fetch — 명령어 인출

PC에는 다음 명령어의 주소가 들어 있다.

CPU는 PC의 주소를 이용해 메모리에 저장된 기계어를 가져온다.

```text
PC
 ↓
Address Bus
 ↓
Memory

Memory
 ↓
Data Bus
 ↓
IR
```

가져온 명령어는 IR(Instruction Register)에 저장된다.

이후 PC는 다음 명령어 주소로 이동한다.

---

## 4. Decode — 명령어 해석

이제 CU가 IR의 기계어를 분석한다.

예를 들어 명령어가

```asm
add eax, ebx
```

라면 CU는

```text
연산 종류 = ADD
입력 = eax, ebx
결과 저장 위치 = eax
```

라는 의미를 해석한다.

그리고 내부 회로에 제어 신호를 전달한다.

```text
eax 값을 ALU 입력으로 전달
ebx 값을 ALU 입력으로 전달
ALU 연산 모드를 ADD로 설정
```

---

## 5. Execute — 실제 계산

이제 ALU가 계산을 수행한다.

가정해보자.

```text
eax = 3
ebx = 5
```

그러면 ALU에는 두 값이 입력된다.

```text
eax(3)
   \
    ALU
   /
ebx(5)

 ↓

8
```

실제 연산은 이진수다.

```text
  00000011
+ 00000101
-----------
  00001000
```

결과는 `8`이다.

---

## 6. 그보다 아래에서는 논리 게이트가 동작한다

ALU 내부에는 가산기 회로가 있다.

가산기는 여러 개의 **Full Adder**로 구성되고, 그보다 더 아래에서는

```text
AND
OR
XOR
```

같은 논리 게이트가 사용된다.

결국

```text
3 + 5
```

라는 수학적인 계산도 하드웨어 관점에서는

```text
High Voltage
Low Voltage
```

와 같은 전기 신호의 조합으로 처리된다.

문서에서는 이를 최종적으로 트랜지스터의 전류 흐름과 연결해서 설명한다.

---

## 7. Write Back — 결과 저장

ALU가 `8`을 계산했다고 끝나는 것이 아니다.

계산 결과를 다시 저장해야 한다.

```text
ALU
 ↓
8
 ↓
Register
 ↓
eax = 8
```

이후 다음 명령어가

```asm
mov [c], eax
```

라면 레지스터의 `8`이 메모리의 변수 `c` 위치에 저장된다.

---

## 8. 전체 명령어 실행 흐름

CPU의 기본 명령어 처리 과정은 다음과 같다.

```text
Fetch
 ↓
Decode
 ↓
Execute
 ↓
Write Back
```

이를 반복하면서 프로그램의 명령어를 하나씩 처리한다.

---

## 9. Clock은 무엇을 할까?

CPU 내부의 여러 회로는 아무 때나 제각각 동작하는 것이 아니다.

Clock 신호에 맞춰 동기화된다.

문서에서는 예를 들어 3.5GHz CPU를 초당 약 35억 회의 클럭 신호가 발생하는 것으로 설명한다.

단순화하면

```text
Clock 1 → Fetch
Clock 2 → Decode
Clock 3 → Execute
Clock 4 → Write Back
```

처럼 이해할 수 있다.

---

## 10. 실제 CPU는 하나 끝나고 다음을 실행하지 않는다

지금까지는 설명을 위해 한 명령어가 모두 끝난 뒤 다음 명령어가 실행된다고 가정했다.

하지만 현대 CPU는 여러 명령어의 단계를 겹쳐 수행한다.

이를 **Pipelining**이라고 한다.

```text
          Cycle1  Cycle2   Cycle3   Cycle4

명령어1   Fetch   Decode   Execute   WB
명령어2           Fetch    Decode   Execute
명령어3                    Fetch    Decode
```

이 방식은 각 명령어의 총 지연시간을 줄인다기보다 **전체 처리량을 증가시키는 것**이 핵심이다.

---

## 11. Pipeline Hazard

문제도 생긴다.

예를 들어

```asm
add eax, ebx
mov [c], eax
```

처럼 바로 앞에서 계산한 결과를 다음 명령어가 즉시 필요로 한다면, 아직 결과 저장이 끝나지 않았을 수 있다.

이런 충돌을 Hazard라고 한다.

문서에서는 해결 방법으로

```text
Forwarding
Stall
```

을 언급한다.

---

## 12. RAM은 CPU보다 느리다

CPU 내부 Register에서 값을 읽는 것과 RAM에서 값을 가져오는 속도는 크게 다르다.

이 차이를 줄이기 위해 Cache가 존재한다.

메모리 계층을 단순화하면 다음과 같다.

```text
빠름
 ↑

Register
L1 Cache
L2 Cache
L3 Cache
RAM

 ↓
느림
```

문서에서도 Register → L1 → L2 → L3 → RAM 순으로 CPU에서 점점 멀어지는 구조를 설명한다.

---

## 13. Cache Hit / Cache Miss

CPU가 필요한 데이터가 Cache에 존재한다면

```text
Cache Hit
```

이다.

없다면

```text
Cache Miss
```

가 발생하고 더 느린 메모리 계층에서 데이터를 가져와야 한다.

따라서 동일한 코드라도 데이터가 CPU 가까이에 존재하는지에 따라 성능 차이가 생길 수 있다.

---

## 14. 우리가 작성한 코드 한 줄의 최종 모습

다시 처음 코드로 돌아가자.

```c
c = a + b;
```

이 한 줄은 다음 계층을 거친다.

```text
C Source
 ↓
Assembly
 ↓
Machine Code
 ↓
Fetch
 ↓
Decode
 ↓
Control Signal
 ↓
ALU
 ↓
Logic Gate
 ↓
Transistor
 ↓
전기 신호
 ↓
계산 결과
```

우리가 고급 언어에서 사용하는 추상적인 연산이 마지막에는 실제 하드웨어의 물리적인 동작으로 이어지는 것이다.

---

## 마무리

이번 편에서는 CPU 안쪽까지 내려가 봤다.

핵심은 다음 흐름이다.

```text
Machine Code
     ↓
PC
     ↓
Fetch
     ↓
IR
     ↓
Decode - CU
     ↓
Execute - ALU
     ↓
Write Back
```

그렇다면 마지막으로 궁금해진다.

C처럼 미리 기계어 실행파일을 만드는 언어가 아니라 **Python이나 JavaScript는 이 CPU 구조 위에서 어떻게 실행될까?**

다음 편에서는 Python PVM과 JavaScript V8을 살펴보고, 지금까지 공부한 내용을 Ubuntu에서 직접 확인하는 방법까지 정리한다.

---