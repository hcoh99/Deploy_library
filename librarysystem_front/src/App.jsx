// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import NewBookPage from "./pages/NewBookPage";
import DetailBookPage from "./pages/DetailBookPage";
import EditBookPage from "./pages/EditBookPage";

// 로그인 & 회원가입
import LoginPage from "./pages/LoginPage"; //
import SignupPage from "./pages/SignupPage"; //
import AdminLoginPage from "./pages/AdminLoginPage";
import { SearchProvider } from "./context/SearchContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <MainPage /> }, // 메인 페이지
        { path: "add-book", element: <NewBookPage /> }, // 도서 등록 페이지
        /* 25.12.05 심미혜
        상세페이지 이동 추가 */
        { path: "book/:bookId", element: <DetailBookPage /> }, // 상세 페이지 이동
        { path: "book/:bookId/edit", element: <EditBookPage /> }, // 수정 페이지
      ],
    },
    /* 25.12.05 심미혜
        로그인&회원가입이동추가 */
    { path: "login", element: <LoginPage /> }, // 로그인 페이지
    { path: "signup", element: <SignupPage /> }, // 회원가입 페이지
    { path: "/admin/login", element: <AdminLoginPage /> }, // 관리자 로그인 페이지
  ]);

  return (
    <SearchProvider>
      <RouterProvider router={router} />;
    </SearchProvider>
  )
}
