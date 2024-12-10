import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import apiClient from "../utils/api";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<{ title: string; author: string; description: string } | null>(null);

  useEffect(() => {
    apiClient.get(`/books/${id}`)
      .then((response) => setBook(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (updatedBook: { title: string; author: string; description: string }) => {
    apiClient.put(`/books/${id}`, updatedBook)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>Edit Book</h1>
      <BookForm
        onSubmit={handleUpdate}
        initialValues={{ title: book.title, author: book.author, description: book.description }}
      />
    </div>
  );
};

export default EditBook;
