import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBookPage() {
  const navigate = useNavigate();
  const { book_id } = useParams();

  const dummyBook = {
    book_id,
    title: "예시 도서 제목",
    author: "홍길동",
    summary: "원래 저장된 책 요약입니다.",
    imageUrl: "",
  };

  const [title, setTitle] = useState(dummyBook.title);
  const [author, setAuthor] = useState(dummyBook.author);
  const [summary, setSummary] = useState(dummyBook.summary);
  const [imageUrl, setImageUrl] = useState(dummyBook.imageUrl);

  // 🔥 더 이상 state로 관리하지 않음 → 오류 제거됨
  const isImageStale = summary !== dummyBook.summary;

  const handleSave = () => {
    console.log("수정된 데이터:", {
      title,
      author,
      summary,
      imageUrl,
    });

    navigate(`/book/${book_id}`);
  };

  const handleRegenerateImage = () => {
    alert("AI 이미지 재생성을 실행합니다 (테스트용).");
    setImageUrl("https://via.placeholder.com/300x200.png?text=New+AI+Image");
  };

  const styles = {
    container: {
      maxWidth: "700px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    textarea: {
      padding: "10px",
      height: "120px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      resize: "none",
    },
    imageBox: {
      width: "100%",
      height: "250px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f3f3f3",
      color: "#666",
      fontSize: "18px",
    },
    regenerateBtn: {
      padding: "10px",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
    },
    saveBtn: {
      padding: "12px",
      backgroundColor: "#198754",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
    backBtn: {
      padding: "10px",
      backgroundColor: "#ddd",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
    },
    warning: {
      color: "red",
      fontSize: "14px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2>✏️ 도서 수정</h2>

      <input
        type="text"
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="책 제목"
      />

      <input
        type="text"
        style={styles.input}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="저자"
      />

      <textarea
        style={styles.textarea}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="책 요약"
      />

      <div style={styles.imageBox}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="AI 이미지"
            style={{ width: "100%", height: "100%", borderRadius: "6px" }}
          />
        ) : (
          "AI 이미지가 아직 생성되지 않았습니다"
        )}
      </div>

      {isImageStale && (
        <div style={styles.warning}>
          요약이 변경되었습니다. 이미지를 다시 생성해야 합니다.
        </div>
      )}

      <button style={styles.regenerateBtn} onClick={handleRegenerateImage}>
        AI 이미지 재생성
      </button>

      <button style={styles.saveBtn} onClick={handleSave}>
        수정 완료
      </button>

      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}
