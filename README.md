```
📚 Library System Frontend

React 기반 도서 관리 시스템 프론트엔드 프로젝트입니다.
사용자가 도서를 조회하고, 신간 정보를 확인하며, 로그인/회원가입 기능을 활용할 수 있는 UI를 제공합니다.

🚀 주요 기술 스택
분야	사용 기술
Frontend Framework	React (Vite 기반)
Styling	CSS, MUI 일부 컴포넌트 (페이지에 따라)
State Management	React Context API (SearchContext)
API 통신	Custom Service (bookService.js)

📁 프로젝트 구조

librarysystem_front-main/
└── librarysystem_front/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── App.css
        ├── index.css
        │
        ├── assets/
        │   └── react.svg
        │
        ├── books/
        │   └── BookCard.jsx
        │
        ├── context/
        │   └── SearchContext.jsx
        │
        ├── layout/
        │   ├── Footer.jsx
        │   ├── Header.jsx
        │   ├── Layout.jsx
        │   └── Slidebar.jsx
        │
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── MainPage.jsx
        │   ├── NewBookPage.jsx
        │   ├── SearchPage.jsx
        │   └── SignUpPage.jsx
        │
        └── services/
            └── bookService.js


🧩 주요 기능 소개

🔍 1. 메인 페이지 (MainPage)

추천 도서 또는 렌더링된 리스트를 조회할 수 있는 홈 화면 구성

🔎 2. 도서 검색 (SearchPage)

SearchContext를 활용하여 검색 상태 전역 관리

검색한 책 목록을 BookCard 컴포넌트로 리스트 렌더링

👤 3. 로그인 / 회원가입 화면

LoginPage.jsx, SignUpPage.jsx 구성

추후 백엔드 API 연동 예정 (TODO)

📚 4. 공통 UI 레이아웃

Layout.jsx : 페이지 전체 구조 관리

Header, Footer, Slidebar 로 구성된 UI 프레임워크

🔗 5. 서비스 계층 (bookService.js)

도서 API 호출을 위한 모듈

axios 또는 fetch 기반 통신 예정



🛠️ 설치 및 실행 방법

1️⃣ 프로젝트 설치
npm install

2️⃣ 개발 서버 실행
npm run dev

3️⃣ 빌드
npm run build



🔧 환경 변수 (.env)


📌 향후 개선 예정 (TODO)



👥 기여자

Frontend Developer: 심미혜 반선우 이한조


📄 라이선스

MIT License
```
