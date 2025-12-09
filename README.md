# 도서 관리 시스템 프론트엔드 (`librarysystem_front`)

React + Vite 기반의 **도서 관리 웹 서비스 프론트엔드 프로젝트**입니다.  
회원/관리자 로그인, 도서 목록/검색/상세 조회, 도서 등록·수정·삭제, 대여/반납 기능을 중심으로 동작하며,  

---

## 1. 주요 기능 개요

### 1.1. 공통 기능
- 메인 페이지에서 도서 목록 조회
- 페이지네이션, 정렬(예: 최신순), 검색 키워드에 따른 필터링
- 도서 카드 클릭 시 상세 페이지로 이동
- 반응형 레이아웃 (Header, Sidebar, Footer 포함)

### 1.2. 회원 관련 기능
- **회원 회원가입**
  - `POST /auth/signup`
  - 입력: 아이디(`memberId`), 비밀번호, 이름, 전화번호, 주소
- **회원 로그인**
  - `POST /auth/login`
  - 응답으로 전달된 `accessToken`을 `localStorage`에 저장
  - 이후 요청 시 `Authorization: Bearer <token>` 헤더 자동 첨부

### 1.3. 관리자 관련 기능
- **관리자 로그인**
  - `POST /admin/login`
  - 응답: `accessToken`, `role: "ADMIN"` (주석 기준)
- 관리자 로그인 이후:
  - **도서 등록**
  - **도서 수정**
  - **도서 삭제** 기능 수행

### 1.4. 도서 기능
- 도서 목록 조회 (페이지네이션, 정렬)
- 도서 검색 (키워드 기반)
- 도서 상세 정보 조회
- 도서 등록/수정/삭제 (관리자 전용)
- 도서 표지용 **AI 이미지 생성 요청**

### 1.5. 대여/반납 기능
- 도서 대여 생성
- 내 대여 목록 조회
- 반납 처리 및 페널티 정보 확인

---

## 2. 기술 스택

### 프론트엔드
- **React 18**
- **Vite** (번들러)
- **React Router v6** (`createBrowserRouter`, `RouterProvider`)
- **Axios** (백엔드 API 연동)
- **MUI (@mui/material, @mui/icons-material)** – UI 컴포넌트
- **Emotion** (@emotion/react, @emotion/styled) – 스타일링

### 개발 도구
- **ESLint** (React + Hooks + Vite 설정)
- Node.js (버전 18 이상 권장)

---

## 3. 폴더 구조

프로젝트 루트 기준 주요 구조는 다음과 같습니다.

```text
librarysystem_front/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/              # 정적 리소스(이미지 등)
│  ├─ books/
│  │  └─ BookCard.jsx      # 도서 카드 UI 컴포넌트
│  ├─ context/
│  │  └─ SearchContext.jsx # 검색어 전역 상태 관리 Context
│  ├─ layout/
│  │  ├─ Footer.jsx
│  │  ├─ Header.jsx
│  │  ├─ Layout.jsx        # 공통 레이아웃(헤더/사이드바/푸터 포함)
│  │  └─ Slidebar.jsx
│  ├─ pages/
│  │  ├─ AdminLoginPage.jsx # 관리자 로그인 페이지
│  │  ├─ DetailBookPage.jsx # 도서 상세 페이지
│  │  ├─ EditBookPage.jsx   # 도서 수정 페이지
│  │  ├─ LoginPage.jsx      # 회원 로그인 페이지
│  │  ├─ MainPage.jsx       # 메인(도서 목록) 페이지
│  │  ├─ NewBookPage.jsx    # 도서 등록 페이지
│  │  └─ SignUpPage.jsx     # 회원가입 페이지
│  ├─ services/
│  │  └─ bookService.js     # 백엔드 API 래퍼 모듈
│  ├─ App.css
│  ├─ App.jsx               # 라우팅 및 최상위 컴포넌트
│  ├─ index.css
│  └─ main.jsx              # ReactDOM 렌더링 엔트리
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.js

```
4. 라우팅 구조

src/App.jsx 에서 createBrowserRouter를 사용해 라우트를 정의합니다.

경로(Path)	컴포넌트	설명
- /	MainPage	도서 목록, 검색, 페이지네이션
- /book/new	NewBookPage	새 도서 등록 (관리자 전용)
- /book/:bookId	DetailBookPage	도서 상세 정보 및 대여/반납
- /book/:bookId/edit	EditBookPage	도서 정보 수정 (관리자 전용)
- /login	LoginPage	회원 로그인
- /signup	SignupPage	회원가입
- /admin/login	AdminLoginPage	관리자 로그인

모든 페이지는 Layout.jsx를 통해 공통 헤더, 사이드바, 푸터를 공유합니다.

5. SearchContext (검색 상태 관리)

- src/context/SearchContext.jsx에서 검색 키워드를 전역으로 관리합니다.

- SearchProvider로 전체 앱을 감쌉니다. (App.jsx 참고)

- useSearch() 훅을 사용하여 다음 값에 접근합니다.

- keyword : 현재 검색어

- setKeyword : 검색어 변경 함수

- MainPage에서 keyword를 활용하여 도서 목록을 필터링/검색합니다.

6. API 서비스 정리 (src/services/bookService.js)

axios.create로 공통 인스턴스를 만들고, 모든 요청에 대해 Authorization 헤더를 자동으로 추가하도록 설정되어 있습니다.

```
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

6.1. 인증 / Auth
| 함수명          | 메서드  | 엔드포인트          | 설명              |
| ------------ | ---- | -------------- | --------------- |
| `signup`     | POST | `/auth/signup` | 회원가입            |
| `login`      | POST | `/auth/login`  | 회원 로그인 (토큰 발급)  |
| `adminLogin` | POST | `/admin/login` | 관리자 로그인 (토큰/권한) |


- signup({ memberId, password, name, phone, address })

- login(memberId, password)

- adminLogin(employeeId, password)
  
6.2. 도서 / Books
| 함수명             | 메서드    | 엔드포인트                        | 설명                |
| --------------- | ------ | ---------------------------- | ----------------- |
| `fetchBooks`    | GET    | `/api/books`                 | 도서 목록 조회 (페이지/정렬) |
| `searchBooks`   | GET    | `/api/books/search`          | 키워드 기반 도서 검색      |
| `fetchBookById` | GET    | `/api/books/{bookId}`        | 단일 도서 상세 조회       |
| `createBook`    | POST   | `/admin/books`               | 도서 등록 (관리자)       |
| `updateBook`    | PUT    | `/api/books/update/{bookId}` | 도서 수정 (관리자)       |
| `deleteBook`    | DELETE | `/api/books/delete/{bookId}` | 도서 삭제 (관리자)       |

- fetchBooks({ page = 1, sort = "latest" })
- searchBooks(keyword)
- fetchBookById(bookId)
- createBook(bookData)
- updateBook(bookId, updateData)
- deleteBook(bookId)
  
6.3. AI 이미지 생성
| 함수명                 | 메서드  | 엔드포인트                  | 설명                  |
| ------------------- | ---- | ---------------------- | ------------------- |
| `generateBookImage` | POST | `/api/images/generate` | 도서 표지용 AI 이미지 생성 요청 |

generateBookImage({ title, prompt })

응답 예: { imageUrl: "..." }

6.4. 대여 / Rentals & Loans
| 함수명              | 메서드   | 엔드포인트                        | 설명         |
| ---------------- | ----- | ---------------------------- | ---------- |
| `createLoan`     | POST  | `/api/loans`                 | 도서 대여 생성   |
| `fetchMyRentals` | GET   | `/rentals/my`                | 내 대여 목록 조회 |
| `returnRental`   | PATCH | `/rentals/{rentalId}/return` | 도서 반납 처리   |

- createLoan({ bookId, memberId })
- fetchMyRentals()
- returnRental(rentalId)

7. 페이지별 역할
7.1. MainPage.jsx

도서 목록 조회
페이지네이션(Pagination 컴포넌트 활용)
검색어(SearchContext.keyword)에 따른 자동 검색/필터
정렬 옵션(sort 상태) 관리

7.2. DetailBookPage.jsx

URL 파라미터 :bookId로 도서 상세 조회
도서 정보 표시 (제목, 작가, 재고, 상태 등)
대여 버튼 클릭 시 createLoan 호출
반납 버튼 클릭 시 returnRental 호출
JWT 미구현 상태를 고려하여 FE에서 임시 memberId: "1"을 전송하는 구조로 작성되어 있으며,
추후 JWT 완성 시 Authorization 헤더만 사용하는 방향으로 변경 예정

7.3. NewBookPage.jsx

새 도서 등록 폼
관리자 로그인 후 접근을 전제로 createBook 호출

7.4. EditBookPage.jsx

기존 도서 정보 로딩 후 수정 폼 제공
수정 완료 시 updateBook 호출

7.5. LoginPage.jsx / SignUpPage.jsx

회원가입/로그인 폼
로그인 성공 시 localStorage에 토큰 저장 및 리다이렉트 처리

7.6. AdminLoginPage.jsx

관리자 전용 로그인
이미 role이 ADMIN인 상태라면 메인 등 다른 페이지로 리다이렉트
로그인 성공 시 토큰과 권한을 localStorage에 저장하는 로직이 포함될 수 있음

8. 환경 변수 설정

백엔드 API 서버의 베이스 URL은 .env 파일의 VITE_API_BASE_URL로 설정합니다.
프로젝트 루트(librarysystem_front)에 .env 또는 .env.local 파일을 생성하고 다음과 같이 작성합니다.

```
VITE_API_BASE_URL=http://localhost:8080
```
값은 실제 백엔드 서버 주소에 맞게 변경하시면 됩니다.
설정 후에는 npm run dev를 다시 실행해야 반영됩니다.

9. 설치 및 실행 방법
9.1. 사전 준비

Node.js 18 이상
npm (또는 pnpm, yarn – 현재 package-lock.json 기준으로 npm 사용)

9.2. 의존성 설치
# 프로젝트 루트에서
```
cd librarysystem_front
npm install
```
9.3. 개발 서버 실행
```
npm run dev
```

일반적으로 http://localhost:5173에서 프론트엔드를 확인할 수 있습니다.
백엔드 서버(VITE_API_BASE_URL)가 동시에 실행 중이어야 실제 API 호출이 정상 동작합니다.

9.4. 빌드
```
npm run build
```

dist/ 디렉터리에 정적 파일이 생성됩니다.
Nginx, Apache, S3, Vercel, Netlify 등 정적 호스팅 환경에 배포할 수 있습니다.

9.5. 빌드 결과 미리보기
```
npm run preview
```

10. 향후 개선 포인트
