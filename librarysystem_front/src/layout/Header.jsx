import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// 검색창 스타일
const SearchBox = styled("div")(() => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: "#f1f3f5",
  width: "100%",
  maxWidth: "800px",
  display: "flex",
  alignItems: "center",
  padding: "6px 14px",
}));

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#000",
        paddingX: 3,
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 로고 */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            BookShelf
          </Typography>
        </Box>

        {/* 오른쪽 영역: 검색창 + 버튼들 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flex: 1,
            justifyContent: "flex-end",
            ml: 4, // ⭐ 로고와 검색창 사이 여유 간격
          }}
        >
          {/* 검색창 */}
          <SearchBox>
            <SearchIcon fontSize="small" sx={{ color: "#868e96", mr: 1 }} />
            <InputBase
              placeholder="검색"
              sx={{ width: "100%", fontSize: 14 }}
            />
          </SearchBox>

          {/* 로그인 버튼 */}
          <Button
            variant="text"
            sx={{
              color: "#1f2937",
              fontWeight: 600,
              whiteSpace: "nowrap", // 줄바꿈 방지
              flexShrink: 0, // 버튼 자체가 쪼그라들지 않게
            }}
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>

          {/* 회원가입 버튼 */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3b82f6",
              borderRadius: "20px",
              px: 2.5,
              py: 0.8,
              fontWeight: 600,
              whiteSpace: "nowrap",
              minWidth: 96,
              flexShrink: 0,
            }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
