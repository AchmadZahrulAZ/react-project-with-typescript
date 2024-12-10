import React from "react";
import BookForm from "../components/BookForm";
import apiClient from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddBook: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (book: { title: string; author: string; description: string; }) => {
    apiClient
      .post("/books", book)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container mt-4">
      <h1>Add a New Book</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBook;
