import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import bookServices from "../services/bookService";

export default function NewBookPage() {
  const navigate = useNavigate();

  // 입력 필드 상태
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

    // ===============================
    // 📌  AI 이미지 생성 (title + prompt 구조로 전송)
    // ===============================
    const handleGenerateAICover = async () => {
      if (!title.trim()) {
        alert("책 제목을 입력해야 합니다.");
        return;
      }

      if (!description.trim()) {
        alert("책 소개(description)를 입력해야 합니다.");
        return;
      }

      if (description.length > 1000) {
        alert("설명은 최대 1000자까지 입력할 수 있습니다.");
        return;
      }

      setLoading(true);
      try {
        // 🔥 title + prompt 를 BE에 별도로 전달
        const result = await bookServices.generateBookImage({
          title: title,
          prompt: description
        });

        if (!result) {
          alert("이미지 생성 실패");
          return;
        }

        //  result 그대로 저장
        setCoverImageUrl(result);

      } catch (err) {
        console.error("AI 이미지 생성 오류:", err);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };
  // ===============================
  // 📌 도서 등록
  // ===============================
  const handleCreateBook = async () => {
    if (!title || !author || !publisher || !genre || !tag || !price || !description || !coverImageUrl) {
      alert("모든 필수 입력값을 입력해주세요.");
      return;
    }

    const payload = {
      title,
      author,
      publisher,
      genre,
      tag,
      price: Number(price),
      description,
      coverImageUrl
    };

    try {
      const res = await bookServices.createBook(payload);

      if (res.msg === "등록완료") {
        alert("도서 등록 완료");
        navigate("/");
      } else {
        alert("등록 처리 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("등록 실패:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📘 새로운 도서 등록</Typography>

      <TextField label="책 제목" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="저자" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} />
      <TextField label="출판사" fullWidth value={publisher} onChange={(e) => setPublisher(e.target.value)} />

      <TextField label="장르" fullWidth value={genre} onChange={(e) => setGenre(e.target.value)} />
      <TextField label="태그" fullWidth value={tag} onChange={(e) => setTag(e.target.value)} />

      <TextField
        label="가격"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <TextField
        label="책 소개 (description) - 1000자 이상 입력 불가능"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* 생성된 이미지 미리보기 */}
      {coverImageUrl && (
        <Paper sx={{ p: 1, border: "1px solid #ccc" }}>
          <img
            src={coverImageUrl}
            alt="cover preview"
            style={{ width: "100%", borderRadius: 6 }}
          />
        </Paper>
      )}

      <Button variant="outlined" fullWidth disabled={loading} onClick={handleGenerateAICover}>
        {loading ? "이미지 생성 중..." : "AI 이미지 생성"}
      </Button>

      <Button variant="contained" fullWidth disabled={!coverImageUrl} onClick={handleCreateBook}>
        도서 등록
      </Button>

      <Button variant="text" fullWidth onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
