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
import bookServices from "../services/bookService";

export default function NewBookPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const [aiImages, setAiImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================================================
  // 📌 AI 프롬프트 생성 (summary 대신 제목 + 장르 사용, 영어 변환)
  // ============================================================
  const buildPrompt = () => {
    const baseTitle = title || "Untitled Book";
    const baseGenre = genre || "General";

    return `A book cover illustration for a ${baseGenre} novel titled "${baseTitle}".
Use a visually appealing and professional style suitable for a published book.`;
  };

  // ============================================================
  // 📌 AI 이미지 생성 API 호출
  // ============================================================
  const handleGenerateAICover = async () => {
    if (!title && !genre) {
      alert("제목 또는 장르가 있어야 이미지 생성이 가능합니다.");
      return;
    }

    setLoading(true);

    try {
      const prompt = buildPrompt();

      // 백엔드는 문자열만 받기 때문에 prompt만 전달
      const result = await bookServices.generateBookImage(prompt);

      console.log("AI 이미지 API 응답:", result);

      let urls = [];

      if (typeof result === "string") {
        urls = [result];
      } else if (result.imageUrl) {
        urls = [result.imageUrl];
      } else if (result.data && Array.isArray(result.data)) {
        urls = result.data.map((img) => img.url);
      }

      if (urls.length === 0) {
        alert("이미지 생성에 실패했습니다.");
        return;
      }

      setAiImages(urls);
    } catch (err) {
      console.error("AI 이미지 생성 오류:", err);
      alert("이미지 생성 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 📌 도서 등록 API 호출
  // ============================================================
  const handleCreateBook = async () => {
    const payload = {
      title,
      author,
      publisher,
      genre,
      tag,
      price,
      coverImageUrl,
      registrationDate: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    };

    console.log("📌 등록 요청 Body:", payload);

    try {
      await bookServices.createBook(payload);
      alert("도서가 등록되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("도서 등록 실패:", err);
      alert("도서 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📘 새로운 도서 추가</Typography>

      <TextField label="책 제목" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="저자" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} />
      <TextField label="출판사" fullWidth value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      <TextField label="장르" fullWidth value={genre} onChange={(e) => setGenre(e.target.value)} />
      <TextField label="태그" fullWidth value={tag} onChange={(e) => setTag(e.target.value)} />
      <TextField label="가격" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />

      {/* AI 이미지 미리보기 */}
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
        <Button variant="outlined" fullWidth disabled={loading} onClick={handleGenerateAICover}>
          {loading ? "이미지 생성 중..." : "AI 이미지 생성"}
        </Button>

        <Button variant="contained" fullWidth disabled={!coverImageUrl} onClick={handleCreateBook}>
          도서 등록
        </Button>
      </Box>

      <Button variant="text" fullWidth onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
