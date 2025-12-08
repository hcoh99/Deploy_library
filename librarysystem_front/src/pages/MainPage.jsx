import { useState, useEffect } from "react";
import { Box, Grid, Pagination, Stack } from "@mui/material";
import BookCard from "../books/BookCard";
import { fetchBooks, searchBooks } from "../services/bookService";
import { useSearch } from "../context/SearchContext";

export default function MainPage() {
  const { keyword } = useSearch(); // 검색어
  const [books, setBooks] = useState([]);

  // 전체 조회용
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 전체 조회 / 검색어 변화 감지
  useEffect(() => {
    const loadBooks = async () => {
      try {
        // 1) 검색어가 있으면 검색 API 실행
        if (keyword && keyword.trim() !== "") {
          const data = await searchBooks(keyword);
          console.log("검색 결과:", data);
          setBooks(data.books || data); // 서버 응답 형태 따라 조정
          setTotalPages(1); // 검색은 페이지네이션 없음
          return;
        }

        // 2) 검색어 없으면 전체 조회
        const data = await fetchBooks({ page });
        console.log("전체 조회:", data);

        setBooks(data.books || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("도서 목록 불러오기 실패:", err);
      }
    };

    loadBooks();
  }, [keyword, page]); // 검색어 또는 페이지 변경될 때 실행

  // 페이지 변경 핸들러
  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <h2>도서 목록</h2>

      {/* 검색 또는 조회 결과 렌더링 */}
      {books.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ✔ 검색 중일 때는 페이지네이션 숨김 */}
      {(!keyword || keyword.trim() === "") && (
        <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
}
