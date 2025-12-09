import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import bookServices from "../services/bookService";

export default function EditBookPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // =======================================
  // 📌 도서 상세정보 불러오기 (GET /api/books/{id})
  // =======================================
  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await bookServices.fetchBookById(bookId);
        setBook(data);
      } catch (err) {
        console.error("도서 불러오기 실패:", err);
        alert("서버 오류가 발생했습니다.");
      }
    };
    loadBook();
  }, [bookId]);

  if (!book) return <Typography>Loading...</Typography>;

  // =======================================
  // 📌 도서 수정 저장 (PATCH /admin/books/{id})
  // =======================================
  const handleUpdate = async () => {
    if (
      !book.title ||
      !book.author ||
      !book.publisher ||
      !book.genre ||
      !book.tag ||
      !book.price ||
      !book.description
    ) {
      alert("모든 필수 입력값을 입력해주세요.");
      return;
    }

    if (book.description.length > 1000) {
      alert("설명은 최대 1000자까지 입력할 수 있습니다.");
      return;
    }

    const payload = {
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      genre: book.genre,
      tag: book.tag,
      price: Number(book.price),
      description: book.description
    };

    setLoading(true);
    try {
      const res = await bookServices.updateBook(bookId, payload);

      if (res.msg === "수정완료") {
        alert("수정이 완료되었습니다.");
        navigate(`/book/${bookId}`);
      } else {
        alert("수정 처리 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("수정 실패:", err);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // =======================================
  // 📌 도서 삭제 (DELETE /admin/books/{id})
  // =======================================
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 이 도서를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    setDeleteLoading(true);
    try {
      const res = await bookServices.deleteBook(bookId);

      if (res.msg === "삭제완료") {
        alert("도서가 삭제되었습니다.");
        navigate("/");
      } else {
        alert("삭제 처리 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // =======================================
  // 📌 렌더링
  // =======================================
  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📘 도서 수정</Typography>

      {/* 표지 이미지 – 수정 불가 */}
      <Paper sx={{ p: 1, border: "1px solid #ccc" }}>
        <img
          src={book.coverImageUrl}
          alt="cover"
          style={{ width: "100%", borderRadius: 6 }}
        />
      </Paper>

      <TextField
        label="책 제목"
        fullWidth
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />

      <TextField
        label="저자"
        fullWidth
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />

      <TextField
        label="출판사"
        fullWidth
        value={book.publisher}
        onChange={(e) => setBook({ ...book, publisher: e.target.value })}
      />

      <TextField
        label="장르"
        fullWidth
        value={book.genre}
        onChange={(e) => setBook({ ...book, genre: e.target.value })}
      />

      <TextField
        label="태그"
        fullWidth
        value={book.tag}
        onChange={(e) => setBook({ ...book, tag: e.target.value })}
      />

      <TextField
        label="가격"
        type="number"
        fullWidth
        value={book.price}
        onChange={(e) => setBook({ ...book, price: e.target.value })}
      />

      <TextField
        label="책 소개 (description) - 1000자 제한"
        fullWidth
        multiline
        rows={4}
        value={book.description}
        onChange={(e) => setBook({ ...book, description: e.target.value })}
      />

      {/* 수정 버튼 */}
      <Button
        variant="contained"
        fullWidth
        disabled={loading}
        onClick={handleUpdate}
      >
        수정 완료
      </Button>

      {/* 삭제 버튼 */}
      <Button
        variant="outlined"
        color="error"
        fullWidth
        disabled={deleteLoading}
        onClick={handleDelete}
      >
        도서 삭제
      </Button>

      {/* 뒤로가기 */}
      <Button variant="text" fullWidth onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
