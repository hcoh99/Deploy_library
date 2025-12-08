import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import BookCard from "../books/BookCard";

// 테스트용 목업 데이터

const MOCK_BOOKS = [
    {
        id: 1,
        title: '채식주의자',
        publisher: '창비',
        author: '한강',
        genre: '소설',
        tags: ['노벨문학상', '베스트셀러', '현대문학'],
        coverUrl: '/covers/book1.jpg',
        price: 13000,
        status: '대출 가능',
        regDate: '2023-01-15'
    },
    // ... 나머지 도서들
];

export default function MaunPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // 📚 실제 API 호출 로직은 여기에 대체합니다.
    setBooks(MOCK_BOOKS);
  }, []);

  return (
    <Box>
      <h2>도서목록</h2>
      {/* 🖼️ 도서 목록 그리드 구현 (MUI Grid 핵심) */}
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid key={book.id}>
            {/* 개별 아이템 컴포넌트 */}
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
