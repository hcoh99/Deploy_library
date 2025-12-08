import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import bookServices from "../services/bookService"; // 🔥 추가

export default function NewBookPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const [aiImages, setAiImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================================================
  // 📌 AI 이미지 생성 API 호출 (유연한 결과 파싱 적용)
  // ============================================================
  const handleGenerateAICover = async () => {
    if (!title && !summary) {
      alert("이미지를 생성하려면 제목 또는 요약이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      const prompt = `${title}\n${summary}`;

      const result = await bookServices.generateBookImage(prompt, {
        n: 4,
        size: "512x512",
      });

      console.log("AI 이미지 API 응답:", result);

      let urls = [];

      // ===========================
      // 1) 응답이 순수 문자열 URL인 경우
      // ===========================
      if (typeof result === "string") {
        urls = [result];
      }

      // ===========================
      // 2) { imageUrl: "..." } 형태
      // ===========================
      else if (result.imageUrl) {
        urls = [result.imageUrl];
      }

      // ===========================
      // 3) { data: [ { url } ] } 형태 (DALL·E 공식 구조)
      // ===========================
      else if (result.data && Array.isArray(result.data)) {
        urls = result.data.map((img) => img.url);
      }

      // ===========================
      // 4) 데이터 없음 → 실패 처리
      // ===========================
      if (urls.length === 0) {
        alert("이미지 생성에 실패했습니다.");
        return;
      }

      setAiImages(urls);

    } catch (err) {
      console.error("AI 이미지 생성 오류:", err);
      alert("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 📌 도서 생성 API 호출
  // ============================================================
  const handleCreateBook = async () => {
    const payload = {
      title,
      author,
      summary,
      coverImageUrl,
    };

    console.log("📌 등록 요청 Body:", payload);

    // 실제 API 연동 시
    /*
    await bookServices.createBook(payload);
    navigate("/");
    */

    navigate("/");
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📘 새로운 도서 추가</Typography>

      <TextField
        label="책 제목"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="저자"
        fullWidth
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <TextField
        label="책 요약"
        fullWidth
        multiline
        rows={4}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {/* AI 이미지 후보 미리보기 */}
      {aiImages.length > 0 && (
        <Grid container spacing={2}>
          {aiImages.map((img, idx) => (
            <Grid item xs={3} key={idx}>
              <Paper
                onClick={() => setCoverImageUrl(img)}
                sx={{
                  border: coverImageUrl === img ? "3px solid #1976d2" : "1px solid #ccc",
                  cursor: "pointer",
                  p: 1,
                }}
              >
                <img src={img} width="100%" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          fullWidth
          disabled={loading}
          onClick={handleGenerateAICover}
        >
          {loading ? "이미지 생성 중..." : "AI 이미지 생성"}
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={!coverImageUrl}
          onClick={handleCreateBook}
        >
          도서 등록
        </Button>
      </Box>

      <Button variant="text" fullWidth onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
