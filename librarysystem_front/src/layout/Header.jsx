import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// 검색창 스타일
const SearchBox = styled("div")(() => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: "#f1f3f5",
  width: "100%", // 화면에 따라 자동 확장
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
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 로고 영역 */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          {/* <img
            src="/logo.svg" // 로고 파일 있으면 교체해도 됨
            alt="logo"
            style={{ width: 28, marginRight: 8 }}
          /> */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            BookShelf
          </Typography>
        </Box>

        {/* 오른쪽: 검색창 + 프로필 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* 검색창 */}
          <SearchBox>
            <SearchIcon fontSize="small" sx={{ color: "#868e96", mr: 1 }} />
            <InputBase
              placeholder="검색"
              sx={{ width: "100%", fontSize: 14 }}
            />
          </SearchBox>

          {/* 프로필 */}
          <IconButton>
            <Avatar
              sx={{
                width: 36,
                height: 36,
              }}
              src="/profile.png" // 사용자 이미지 있으면 교체
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
