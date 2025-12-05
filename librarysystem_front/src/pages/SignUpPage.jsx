// src/pages/SignupPage.jsx
import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 여기서 추후 회원가입 API 호출 예정
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
          회원가입
        </Typography>

        {/* 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField label="이름" variant="outlined" size="small" fullWidth />
          <TextField label="주소" variant="outlined" size="small" fullWidth />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="전화번호"
            variant="outlined"
            size="small"
            fullWidth
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
            회원가입
          </Button>
        </Box>

        {/* 로그인으로 이동 */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate("/login")}
        >
          이미 계정이 있으신가요? 로그인
        </Typography>
      </Paper>
    </Box>
  );
}
