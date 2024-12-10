import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Book from '../types/Book';
import apiClient from '../utils/api';
import Swal from 'sweetalert2';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  })

  const getData = () => {
    apiClient.get("/books")
    .then((res) => {
      Toast
      setBooks(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure, you want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      denyButtonText: 'No, Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient
          .delete(`/books/${id}`)
          .then(() => {
            getData();
            Toast.fire({
              icon: 'success',
              title: 'Book deleted successfully'
            })
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1>Bookshelf</h1>
      <BookList onDelete={handleDelete} books={books} />
    </div>
  );
};

export default Home;
