// src/pages/AdminLoginPage.jsx
// 관리자 로그인 페이지

import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import bookServices from "../services/bookService";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 관리자 로그인 API 호출
      const { accessToken, role } = await bookServices.adminLogin(
        employeeId,
        password
      );

      // 토큰 / 권한 저장 (필요에 따라 key는 팀에서 합의해서 사용)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role); // "ADMIN"

      // 로그인 성공 → 메인 페이지나 관리자 전용 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("관리자 로그인 실패:", error);
      alert(
        "관리자 로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#e9ecef",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* 상단 타이틀 */}
        <Typography variant="h6" align="center" sx={{ fontWeight: 700, mb: 1 }}>
          BookShelf
        </Typography>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          관리자 로그인
        </Typography>

        {/* 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          {/* 직원 ID */}
          <TextField
            label="사원번호"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="사원번호를 입력하세요"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          {/* 비밀번호 */}
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              borderRadius: 999,
              py: 1.1,
            }}
          >
            로그인
          </Button>
        </Box>

        {/* 일반 회원 로그인으로 돌아가기 */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          일반 회원 로그인으로 돌아가기
        </Typography>
      </Paper>
    </Box>
  );
}
