import React, { useState } from "react";
import Book from "../types/Book";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
  initialValues?: { title: string; author: string; description: string };
}

const BookForm: React.FC<BookFormProps> = ({
  onSubmit,
  initialValues = { title: "", author: "", description: "" }, // Default fallback
}) => {
  const [title, setTitle] = useState<string>(initialValues.title);
  const [author, setAuthor] = useState<string>(initialValues.author);
  const [description, setDescription] = useState<string>(initialValues.description);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit({ title, author, description });
    setTitle("");
    setAuthor("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-plus-square me-2"></i> Submit
      </button>
    </form>
  );
};

export default BookForm;
