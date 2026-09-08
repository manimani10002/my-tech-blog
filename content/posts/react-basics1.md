---
title: 'React 곱씹어 보기(1)'
description: '1편. React 핵심 개념 — 컴포넌트부터 상태 공유까지'
date: '2026-09-08'
tags: ['Frontend', 'React']
draft: false
---

React를 공부하다 보면 `컴포넌트`, `JSX`, `Props`, `State`, `Hook` 같은 용어를 계속 만나게 된다.

각각의 개념만 놓고 보면 그렇게 어렵지는 않은데, 막상 코드를 작성하려고 하면

> 그래서 이걸 언제 쓰는 거지?

라는 생각이 들 때가 많았다.

그래서 이번에는 React 공식 문서의 Quick Start 내용을 기준으로, 실제로 React를 사용할 때 자주 만나는 핵심 개념들을 한 번 정리해봤다.

공식 문서에서도 컴포넌트 생성부터 JSX, 데이터 출력, 조건/리스트 렌더링, 이벤트, 상태 관리, 컴포넌트 간 데이터 공유까지 React에서 자주 사용하는 핵심 흐름을 한 번에 다루고 있다.

이번 글에서 정리할 내용은 다음과 같다.

* 컴포넌트
* JSX
* 스타일 적용
* 데이터 출력
* 조건부 렌더링
* 리스트 렌더링
* 이벤트 처리
* State
* Hook
* Props와 상태 끌어올리기

---

## 1. React는 컴포넌트로 화면을 만든다

React를 처음 배울 때 가장 먼저 이해해야 하는 개념은 역시 **컴포넌트(Component)** 다.

React 애플리케이션은 여러 개의 컴포넌트를 조합해서 하나의 화면을 만든다.

컴포넌트의 크기는 정해져 있지 않다.

버튼 하나처럼 작은 UI가 컴포넌트가 될 수도 있고, 하나의 페이지 전체가 컴포넌트가 될 수도 있다.

가장 기본적인 형태는 다음과 같다.

```jsx
function MyButton() {
  return (
    <button>버튼</button>
  );
}
```

React 컴포넌트는 JavaScript 함수이고, JSX를 반환한다.

만든 컴포넌트는 다른 컴포넌트 안에서 다시 사용할 수 있다.

```jsx
function MyButton() {
  return (
    <button>버튼</button>
  );
}

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <MyButton />
    </div>
  );
}
```

처음에는 HTML을 함수로 나눠놓은 것처럼 보이지만, React를 사용하다 보면 이 컴포넌트 단위의 설계가 꽤 중요하다는 것을 느끼게 된다.

화면 전체를 한 컴포넌트에 작성하는 것이 아니라,

```text
Page
 ├─ Header
 ├─ Navigation
 ├─ Content
 ├─ Button
 └─ Footer
```

이런 식으로 역할에 따라 UI를 나눠서 관리할 수 있기 때문이다.

### 컴포넌트 이름은 대문자로 시작한다

React에서 하나 기억해야 하는 규칙이 있다.

React 컴포넌트의 이름은 **대문자로 시작해야 한다.**

```jsx
<MyButton />
```

반면 HTML 태그는 소문자로 작성한다.

```jsx
<button />
<div />
<h1 />
```

React는 첫 글자를 보고 HTML 태그인지 React 컴포넌트인지 구분한다.

그래서 다음처럼 작성하면 안 된다.

```jsx
function myButton() {
  return <button>버튼</button>;
}
```

컴포넌트라면 다음처럼 작성해야 한다.

```jsx
function MyButton() {
  return <button>버튼</button>;
}
```

---

## 2. JSX

React 코드를 처음 보면 가장 낯선 부분이 JSX였다.

```jsx
function App() {
  return (
    <div>
      <h1>Hello React</h1>
    </div>
  );
}
```

JavaScript 안에 HTML이 들어가 있는 것처럼 보인다.

이 문법이 **JSX**다.

JSX는 JavaScript 안에서 UI 구조를 작성할 수 있게 해주는 문법이다.

React에서 JSX가 반드시 필요한 것은 아니지만, 대부분의 React 프로젝트에서는 JSX를 사용한다.

### JSX는 HTML과 완전히 같지는 않다

겉보기에는 HTML과 거의 비슷하지만 몇 가지 규칙이 있다.

우선 태그를 반드시 닫아야 한다.

```jsx
<img />
<br />
```

그리고 컴포넌트는 여러 개의 요소를 바로 반환할 수 없다.

```jsx
return (
  <h1>Hello</h1>
  <p>React</p>
);
```

위 코드는 에러가 발생한다.

하나의 부모 요소로 감싸야 한다.

```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>React</p>
  </div>
);
```

굳이 `div`를 추가하고 싶지 않다면 Fragment를 사용하면 된다.

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>React</p>
  </>
);
```

React 코드를 작성하다 보면 `<> </>`를 정말 자주 사용하게 된다.

---

## 3. CSS를 적용할 때는 className

JSX에서 CSS를 적용하는 방식도 HTML과 거의 비슷하다.

다만 한 가지 차이가 있다.

HTML에서는 다음처럼 작성한다.

```html
<img class="avatar">
```

React JSX에서는 `class` 대신 `className`을 사용한다.

```jsx
<img className="avatar" />
```

CSS는 평소 작성하던 방식과 동일하다.

```css
.avatar {
  border-radius: 50%;
}
```

React에서는 JSX에 CSS 클래스를 지정할 때 `className`을 사용한다.

처음에는 자꾸 `class`라고 적게 되는데, React를 사용하다 보면 자연스럽게 익숙해진다.

---

## 4. JSX에서 JavaScript 데이터 사용하기

React에서는 데이터를 화면에 출력해야 하는 경우가 정말 많다.

예를 들어 사용자 정보가 있다고 해보자.

```jsx
const user = {
  name: 'Park'
};
```

이 값을 JSX 안에서 사용하려면 `{}`를 사용한다.

```jsx
function Profile() {
  return (
    <h1>{user.name}</h1>
  );
}
```

그러면 화면에는 다음과 같이 출력된다.

```text
Park
```

속성에서도 JavaScript 값을 사용할 수 있다.

```jsx
const user = {
  name: 'Park',
  imageUrl: '/profile.png'
};

function Profile() {
  return (
    <img
      src={user.imageUrl}
      alt={user.name}
    />
  );
}
```

문자열을 직접 넣을 때는 따옴표를 사용하고,

```jsx
className="avatar"
```

JavaScript 값을 넣을 때는 중괄호를 사용한다.

```jsx
src={user.imageUrl}
```

처음 JSX를 볼 때 `{}`가 여기저기 있어서 헷갈렸는데, 나는 그냥

> JSX 안에서 JavaScript를 사용하려면 `{}` 안으로 들어간다.

라고 이해했다.

JSX에서는 변수뿐 아니라 JavaScript 표현식도 사용할 수 있다.

```jsx
<h1>{user.firstName + user.lastName}</h1>
```

이런 식이다.

---

## 5. 조건부 렌더링

실제 서비스를 만들다 보면 조건에 따라 화면을 다르게 보여줘야 할 일이 굉장히 많다.

예를 들면

* 로그인 여부
* 사용자 권한
* 데이터 존재 여부
* 로딩 상태
* 에러 상태

등이다.

React는 별도의 조건문 문법이 있는 것이 아니라 JavaScript 조건문을 그대로 사용한다.

```jsx
let content;

if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return (
  <div>
    {content}
  </div>
);
```

하지만 실제 React 코드를 작성하다 보면 JSX 안에서는 삼항 연산자를 더 자주 사용하는 것 같다.

```jsx
return (
  <div>
    {isLoggedIn
      ? <AdminPanel />
      : <LoginForm />
    }
  </div>
);
```

조건을 만족할 때만 특정 UI를 보여주고 싶다면 `&&`도 많이 사용한다.

```jsx
return (
  <div>
    {isLoggedIn && <AdminPanel />}
  </div>
);
```

개인적으로는 다음처럼 구분해서 사용하고 있다.

```jsx
// 조건에 따라 A 또는 B
condition ? A : B

// 조건이 true일 때만 A
condition && A
```

---

## 6. 리스트 렌더링과 map()

React를 사용하면서 `map()`은 정말 자주 사용한다.

API에서 데이터를 받아오면 대부분 배열 형태이기 때문이다.

예를 들어 상품 목록이 있다고 해보자.

```jsx
const products = [
  { id: 1, title: 'Apple' },
  { id: 2, title: 'Banana' },
  { id: 3, title: 'Orange' }
];
```

이 데이터를 화면에 출력할 때 `map()`을 사용할 수 있다.

```jsx
function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.title}
        </li>
      ))}
    </ul>
  );
}
```

JavaScript 배열을 `map()`으로 순회하면서 JSX로 변환하는 방식이다.

실제 프로젝트에서는 이런 형태를 더 자주 보게 된다.

```jsx
products.map(product => (
  <ProductCard
    key={product.id}
    product={product}
  />
))
```

결국

```text
배열 데이터
    ↓
map()
    ↓
컴포넌트 배열
    ↓
화면 렌더링
```

이런 구조다.

---

## 7. key는 왜 필요할까?

리스트를 렌더링하다 보면 거의 반드시 `key`를 작성하게 된다.

```jsx
<li key={product.id}>
  {product.title}
</li>
```

`key`는 React가 리스트의 각각의 요소를 구분할 때 사용하는 값이다.

예를 들어 리스트에 항목이 추가되거나 삭제되거나 순서가 변경되었을 때 React는 `key`를 이용해 어떤 요소가 변경되었는지 판단한다.

그래서 가능하면 데이터가 가지고 있는 고유한 ID를 사용하는 것이 좋다.

```jsx
<ProductCard
  key={product.id}
  product={product}
/>
```

이런 형태가 가장 익숙하다.

---

## 8. 이벤트 처리

이제 사용자가 화면과 상호작용할 수 있도록 이벤트를 처리해보자.

버튼 클릭 이벤트를 예로 들면 다음과 같다.

```jsx
function MyButton() {

  function handleClick() {
    alert('버튼 클릭');
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
```

여기서 처음 React를 배울 때 헷갈렸던 부분이 있었다.

```jsx
onClick={handleClick}
```

왜 `handleClick()`이 아니라 `handleClick`일까?

이 둘은 의미가 다르다.

```jsx
handleClick()
```

은 **지금 함수를 실행하는 것**이고,

```jsx
handleClick
```

은 **함수 자체를 전달하는 것**이다.

React에게

> 사용자가 클릭하면 이 함수를 실행해줘.

라고 전달하는 것이다.

그래서 다음처럼 작성한다.

```jsx
<button onClick={handleClick}>
```

React가 사용자의 클릭 시점에 해당 함수를 실행한다.

---

## 9. 화면의 값을 변경하려면 State

여기서 React의 중요한 개념 중 하나인 **State**가 등장한다.

버튼을 클릭할 때 숫자가 증가하는 Counter를 만든다고 해보자.

React에서는 화면에 영향을 주는 값을 상태로 관리한다.

대표적인 Hook이 `useState`다.

```jsx
import { useState } from 'react';
```

다음처럼 사용한다.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button>
      {count}
    </button>
  );
}
```

이 부분을 처음 봤을 때 문법이 조금 낯설었다.

```jsx
const [count, setCount] = useState(0);
```

나눠서 보면 생각보다 단순하다.

```text
count
→ 현재 상태 값

setCount
→ 상태를 변경하는 함수

0
→ 초기값
```

즉,

```jsx
useState(0)
```

은 초기값이 `0`인 상태를 하나 만드는 것이다.

---

## 10. State를 변경하면 화면이 다시 렌더링된다

이제 버튼을 클릭했을 때 숫자를 증가시켜보자.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

버튼을 클릭하면

```jsx
setCount(count + 1);
```

이 실행된다.

그러면 `count` 값이 변경되고 React가 컴포넌트를 다시 렌더링한다.

나는 이 흐름을 다음처럼 이해하고 있다.

```text
사용자 클릭
    ↓
handleClick 실행
    ↓
setCount 실행
    ↓
State 변경
    ↓
컴포넌트 다시 렌더링
    ↓
화면 변경
```

React를 공부하면서 가장 중요하다고 느낀 부분 중 하나다.

React에서는 결국 **State가 바뀌면 UI가 다시 계산된다.**

---

## 11. 같은 컴포넌트라도 State는 각각 존재한다

이번에는 같은 Counter를 두 개 렌더링해보자.

```jsx
function App() {
  return (
    <>
      <Counter />
      <Counter />
    </>
  );
}
```

두 컴포넌트는 같은 `Counter` 함수를 사용하지만 각각 독립적인 State를 가진다.

즉,

```text
Counter 1
count = 0

Counter 2
count = 0
```

첫 번째 Counter를 클릭해서 `count`가 증가해도 두 번째 Counter에는 영향을 주지 않는다.

각 컴포넌트가 자신의 State를 따로 가지고 있기 때문이다.

---

## 12. Hook

React를 사용하면 이런 함수들을 계속 만나게 된다.

```jsx
useState()
useEffect()
useRef()
useMemo()
```

이처럼 `use`로 시작하는 함수를 **Hook**이라고 한다.

`useState` 역시 React에서 제공하는 Hook 중 하나다.

Hook에는 중요한 규칙이 있다.

**컴포넌트의 최상위에서 호출해야 한다.**

예를 들어 다음처럼 조건문 안에서 사용하면 안 된다.

```jsx
if (isLoggedIn) {
  const [count, setCount] = useState(0);
}
```

반복문 안에서 호출하는 것도 안 된다.

```jsx
for (...) {
  const [count, setCount] = useState(0);
}
```

보통 다음처럼 컴포넌트 상단에 작성한다.

```jsx
function App() {
  const [count, setCount] = useState(0);

  // ...
}
```

---

## 13. 여러 컴포넌트가 같은 State를 사용하려면?

여기서 조금 중요한 상황이 나온다.

버튼 두 개를 만들었다고 해보자.

```jsx
<MyButton />
<MyButton />
```

각각 `useState`를 사용하면 두 버튼의 상태는 독립적이다.

```text
MyButton
count = 0

MyButton
count = 0
```

그런데 두 버튼이 같은 값을 보여줘야 한다면 어떻게 해야 할까?

처음에는 각각의 컴포넌트 상태를 어떻게 동기화해야 하나 생각할 수 있다.

하지만 React에서는 보통 상태를 공통 부모로 올린다.

이걸 **Lifting State Up**, 상태 끌어올리기라고 한다.

기존 구조가

```text
App
 ├─ MyButton → count
 └─ MyButton → count
```

였다면,

공통 상태를 부모로 옮긴다.

```text
App → count
 ├─ MyButton
 └─ MyButton
```

---

## 14. 상태 끌어올리기

코드로 작성하면 다음과 같다.

```jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <MyButton
        count={count}
        onClick={handleClick}
      />

      <MyButton
        count={count}
        onClick={handleClick}
      />
    </div>
  );
}
```

이제 `count`는 각각의 `MyButton`이 관리하는 것이 아니라 부모인 `App`이 관리한다.

그리고 필요한 값을 자식에게 전달한다.

여기서 등장하는 개념이 **Props**다.

---

## 15. Props로 데이터를 전달한다

부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 Props를 사용한다.

```jsx
<MyButton
  count={count}
  onClick={handleClick}
/>
```

여기서는 두 가지 값을 전달하고 있다.

```text
count
onClick
```

자식 컴포넌트에서는 다음처럼 받을 수 있다.

```jsx
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

이제 두 개의 `MyButton`은 부모가 가지고 있는 같은 `count`를 사용한다.

흐름을 따라가 보면 다음과 같다.

```text
MyButton 클릭
    ↓
onClick 실행
    ↓
App의 handleClick 실행
    ↓
setCount 실행
    ↓
App의 count 변경
    ↓
새로운 count를 자식에게 Props로 전달
    ↓
두 MyButton 모두 업데이트
```

이 부분까지 이해하고 나니 Props와 State의 차이도 훨씬 명확해졌다.

내가 정리한 기준은 간단하다.

```text
State
→ 컴포넌트가 관리하는 상태

Props
→ 부모가 자식에게 전달하는 값
```

---

# 전체 흐름 정리

React의 기본 개념들을 하나씩 보면 각각 별개의 개념처럼 느껴지는데, 실제로는 하나의 흐름으로 이어져 있다.

먼저 화면을 컴포넌트로 나눈다.

```jsx
function Button() {
  return <button>Click</button>;
}
```

그리고 JSX로 화면을 만든다.

```jsx
return (
  <div>
    <Button />
  </div>
);
```

JavaScript 데이터를 화면에 출력한다.

```jsx
<h1>{user.name}</h1>
```

조건에 따라 다른 컴포넌트를 보여준다.

```jsx
{isLoggedIn ? <Home /> : <Login />}
```

배열 데이터는 `map()`으로 렌더링한다.

```jsx
items.map(item => (
  <Item
    key={item.id}
    item={item}
  />
))
```

사용자의 행동은 이벤트로 처리한다.

```jsx
<button onClick={handleClick}>
```

화면에 영향을 주는 값은 State로 관리한다.

```jsx
const [count, setCount] = useState(0);
```

여러 컴포넌트가 같은 값을 사용해야 한다면 State를 공통 부모로 올린다.

```text
App
 ├─ MyButton
 └─ MyButton
```

그리고 Props를 통해 자식에게 전달한다.

```jsx
<MyButton
  count={count}
  onClick={handleClick}
/>
```

결국 React의 기본적인 데이터 흐름을 정리하면 다음과 같다.

```text
State
  ↓
Props
  ↓
Component
  ↓
UI
  ↓
Event
  ↓
State 변경
  ↓
Re-render
```

---

# 마무리

React를 처음 배울 때는 컴포넌트, Props, State, Hook처럼 새로운 용어가 계속 나오다 보니 각각을 따로 외우려고 했던 것 같다.

그런데 프로젝트를 진행하면서 느낀 건, 각각의 문법보다 **데이터가 어디에 있고 어디로 흘러가는지 이해하는 것이 훨씬 중요하다**는 점이었다.

결국 React 코드를 작성할 때 계속 고민하게 되는 건 다음과 같은 문제다.

### 이 UI는 어떤 컴포넌트로 나눌 것인가?

```text
Page
 ├─ Header
 ├─ Content
 ├─ Button
 └─ Footer
```

### 이 State는 어디에서 관리할 것인가?

```jsx
const [data, setData] = useState();
```

### 어떤 컴포넌트에게 Props로 전달할 것인가?

```jsx
<Child data={data} />
```

React 공식 Quick Start도 컴포넌트에서 시작해서 JSX, 렌더링, 이벤트, State를 거쳐 마지막에는 컴포넌트 간 상태 공유까지 연결되는 구조로 되어 있다.

나 역시 React를 공부할 때 개별 문법을 외우기보다는 다음 흐름을 기준으로 다시 정리해보려고 한다.

```text
컴포넌트
    ↓
데이터
    ↓
State
    ↓
Props
    ↓
이벤트
    ↓
State 변경
    ↓
Re-render
```

이 기본 흐름이 잡히고 나면 이후 `useEffect`, Context API, 전역 상태 관리 같은 개념들도 조금 더 자연스럽게 연결해서 이해할 수 있다.
