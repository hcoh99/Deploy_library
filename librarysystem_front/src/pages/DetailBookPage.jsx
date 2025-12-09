import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import bookServices from "../services/bookService";

export default function DetailBookPage() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [book, setBook] = useState(null);
  const [loanId, setLoanId] = useState(null); // rentalId → loanId로 변경
  const [loading, setLoading] = useState(false);

  // =======================================
  // 📌 도서 상세 조회
  // GET /api/books/{bookId}
  // =======================================
  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await bookServices.fetchBookById(bookId);
        setBook(res);
      } catch (err) {
        console.error("상세 조회 오류:", err);
        alert("서버 오류가 발생했습니다.");
      }
    };
    loadDetail();
  }, [bookId]);

  if (!book) return <Typography>Loading...</Typography>;

  // =======================================
  // ⚠ JWT 관련 설명
  // 현재 memberId는 백엔드에서 JWT 미구현 상태이기 때문에
  // FE에서 임시로 "1"을 전달하는 구조.
  // JWT가 완성되면 memberId는 보내지 않고
  // Authorization 헤더만 보내면 됨.
  // =======================================

  // =======================================
  // 📌 대여 (POST /api/loans)
  // 응답: { loanId, dueDate }
  // =======================================
  const handleRent = async () => {
    try {
      setLoading(true);

      const res = await bookServices.createLoan({
        bookId: Number(bookId),
        memberId: "1" // ⭐ 임시. JWT 적용 후 삭제됨
      });

      setLoanId(res.loanId); // loanId 저장
      setBook((prev) => ({ ...prev, stockcount: 0 })); // UI 업데이트 (재조회 전 임시 반영)

    } catch (err) {
      console.error("대여 실패:", err);
      alert("대여 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // =======================================
  // 📌 반납 (PATCH /api/loans/{loanId}/return)
  // 응답: { msg, penalty }
  // =======================================
  const handleReturn = async () => {
    try {
      setLoading(true);

      await bookServices.returnRental(loanId);

      setLoanId(null);
      setBook((prev) => ({ ...prev, stockcount: 1 })); // UI 업데이트 (재조회 전 임시 반영)

    } catch (err) {
      console.error("반납 실패:", err);
      alert("반납 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">📖 도서 상세 정보</Typography>

      {/* 표지 이미지 */}
      <Paper variant="outlined">
        <img
          src={book.coverImageUrl}
          alt="cover"
          style={{ width: "100%", borderRadius: 6 }}
        />
      </Paper>

      {/* 책 정보 */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 제목</Typography>
        <Typography>{book.title}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">저자</Typography>
        <Typography>{book.author}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">출판사</Typography>
        <Typography>{book.publisher}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">장르</Typography>
        <Typography>{book.genre}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">태그</Typography>
        <Typography>{book.tag}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">가격</Typography>
        <Typography>{book.price} 원</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">책 소개</Typography>
        <Typography>{book.description}</Typography>
      </Paper>

      {/* =======================
          📌 대출 가능 / 불가 표시
      ======================== */}
      <Typography
        fontWeight="bold"
        sx={{ fontSize: "18px", textAlign: "center" }}
      >
        {book.stockcount === 1 ? "대출 가능" : "대출 불가"}
      </Typography>

      {/* =======================
          📌 대여 / 반납 버튼
      ======================== */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            disabled={book.stockcount === 0 || loading}
            onClick={handleRent}
          >
            대출
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            disabled={!loanId || loading}
            onClick={handleReturn}
          >
            반납
          </Button>
        </Grid>
      </Grid>

      {/* 수정 버튼 */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(`/book/${bookId}/edit`)}
      >
        도서 수정
      </Button>

      {/* 뒤로가기 */}
      <Button variant="text" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Box>
  );
}
