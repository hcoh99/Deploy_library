// src/services/bookService.js
import axios from "axios";

// ---------------------------------------------------------------------------
// 1) Axios 기본 설정
// ---------------------------------------------------------------------------
const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
  timeout: 5000,
});

// 토큰 자동 포함
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// 2) 도서 관련 API 함수들
// ---------------------------------------------------------------------------

// 도서 조회
export const fetchBooks = () => api.get('/books');

// 도서 상세 조회
export const getBookById = (bookId) => api.get(`/books/${bookId}`);

// 도서 등록
export const createBook = (data) => api.post(`/admin/books`, data);

// 도서 수정
export const updateBook = (bookId, data) =>
  api.put(`/admin/books/${bookId}`, data);

// 도서 삭제
export const deleteBook = (bookId) =>
  api.delete(`/admin/books/${bookId}`);

// 대출
export const rentBook = (bookId) =>
  api.post(`/rentals`, { bookId });

// 반납
export const returnBook = (rentalId) =>
  api.patch(`/rentals/${rentalId}/return`);

export default api;
 