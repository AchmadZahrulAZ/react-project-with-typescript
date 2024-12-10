import React from "react";
import BookCard from "./BookCard";
import Book from "../types/Book";

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete }) => (
  <div className="row">
    {books.length > 0 ? (
      books.map((book) => (
        <div className="col-md-4" key={book.id}>
          <BookCard onDelete={onDelete} book={book} />
        </div>
      ))
    ) : (
      <div className="alert alert-light" role="alert">
        No books found.
      </div>
    )}
  </div>
);

export default BookList;
