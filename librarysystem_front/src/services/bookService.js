// src/services/bookServices.js
import axios from "axios";

// 공통 axios 인스턴스
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

// 매 요청마다 토큰 자동 첨부 (로그인 후 localStorage에 accessToken 저장했다고 가정)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    // 백엔드에서 "Header: Token"이라고만 되어 있는데
    // 보통은 Authorization: Bearer 토큰 을 많이 사용함
    // 필요하면 백엔드 팀과 헤더 키 이름 상의해서 수정
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======================= 인증/Auth =======================

// 회원가입 POST /auth/signup
// Body: { memberId, password, name, phone, address }
// Res:  { "status": 201, "msg": "가입완료" }
export async function signup({ memberId, password, name, phone, address }) {
  const res = await api.post("/auth/signup", {
    memberId,
    password,
    name,
    phone,
    address,
  });
  return res.data;
}

// 회원 로그인 POST /auth/login
// Body: { memberId, password }
// Res:  { accessToken }
export async function login(memberId, password) {
  const res = await api.post("/auth/login", { memberId, password });
  return res.data; // { accessToken }
}

// 관리자 로그인 POST /admin/login
// Body: { employeeId, password }
// Res:  { accessToken, role: "ADMIN" }
export async function adminLogin(employeeId, password) {
  const res = await api.post("/admin/login", { employeeId, password });
  return res.data;
}

// ======================= 도서/Books =======================

// 도서 조회
// Query: ?page=1&sort=latest  (정의서 예시)
// Res: { count, books: [ { bookId, title, ..., coverImageUrl, ... }, ... ] }
export async function fetchBooks({ page = 1, sort = "latest" } = {}) {
  const res = await api.get("/api/books", {
    params: { page, sort },
  });
  return res.data;
}

// 도서 검색 GET /books/search?keyword=해리포터
// Res: { count, books: [ ... ] }
export async function searchBooks(keyword) {
  const res = await api.get("/api/books/search", {
    params: { keyword },
  });
  return res.data;
}

// 도서 상세 GET /books/{bookId}
// Res: { bookId, title, ..., stockCount, availableStock, ... }
export async function fetchBookById(bookId) {
  const res = await api.get(`/books/${bookId}`);
  return res.data;
}

// 도서 등록 (관리자) POST /admin/books
// Body: { title, author, publisher, genre, tag, coverImageUrl, price, registrationDate }
export async function createBook(bookData) {
  const res = await api.post("/api/books", bookData);
  return res.data;
}

// 도서 수정 (관리자) UPDATE /api/books/update/{bookId}
// Body: 도서 수정 내용 전체
// Method가 UPDATE로 써있는데, 보통 PUT 또는 PATCH 중 하나일 것 → 일단 PUT으로 가정
export async function updateBook(bookId, updateData) {
  const res = await api.put(`/api/books/update/${bookId}`, updateData);
  return res.data;
}

// 도서 삭제 (관리자) DELETE /api/books/delete/{bookId}
export async function deleteBook(bookId) {
  const res = await api.delete(`/api/books/delete/${bookId}`);
  return res.data;
}

// ======================= AI 이미지 생성 =======================

// AI 이미지 생성 POST /api/images/generate
// Body: { prompt, n?, size? }  (명세에 n, size는 안 넣어도 된다고 적혀 있음)
// Res 성공: { data: [ { url: "..." }, ... ] }
//   실패: { errorMessage: "이미지가 생성되지 않았습니다." }
export async function generateBookImage(prompt, options = {}) {
  const { n = 1, size = "1024x1024" } = options;
  const res = await api.post("/api/images/generate", {
    prompt,
    n,
    size,
  });
  return res.data;
}

// ======================= 대여/반납 Rentals & Loans =======================

// 도서 대여 POST /api/loans
// Header: Token
// Body: { bookId, memberId }
// Res: { "loanId": 55, "dueDate": "2024-12-11" }
export async function createLoan({ bookId, memberId }) {
  const res = await api.post("/api/loans", { bookId, memberId });
  return res.data;
}

// 내 대여 목록 GET /rentals/my
// Header: Token
// Res: [ { rentalId, bookTitle, returnDate, status }, ... ]
export async function fetchMyRentals() {
  const res = await api.get("/rentals/my");
  return res.data;
}

// 반납 하기 PATCH /rentals/{rentalId}/return
// Header: Token
// Res: { "msg": "반납 완료", "penalty": 0 }
export async function returnRental(rentalId) {
  const res = await api.patch(`/rentals/${rentalId}/return`);
  return res.data;
}

// ======================= default export =======================

const bookServices = {
  // Auth
  signup,
  login,
  adminLogin,

  // Books
  fetchBooks,
  searchBooks,
  fetchBookById,
  createBook,
  updateBook,
  deleteBook,

  // AI
  generateBookImage,

  // Rentals
  createLoan,
  fetchMyRentals,
  returnRental,
};

export default bookServices;
