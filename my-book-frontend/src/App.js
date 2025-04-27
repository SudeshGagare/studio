import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/books');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        fetchBooks();
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (book) => {
    try {
      const response = await fetch('http://localhost:8080/books', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        fetchBooks();
      } else {
        throw new Error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (isbn) => {
    try {
      const response = await fetch(`http://localhost:8080/books/${isbn}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchBooks();
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBookClick = () => {
    setSelectedBook(null);
    setShowForm(true);
  }
  const handleUpdateBookClick = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  }

  const handleCancel = () => {
    setSelectedBook(null);
    setShowForm(false);
  };

  const handleSubmit = (book) => {
    if(selectedBook){
      updateBook(book);
    }else{
      addBook(book);
    }
    setShowForm(false);
  }

  return (
    <div className="App">
      <h1>Book Library</h1>
      <button onClick={handleAddBookClick}>Add Book</button>
      {showForm && (
        <BookForm
          book={selectedBook}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      <BookList
        books={books}
        onDelete={deleteBook}
        onUpdate={handleUpdateBookClick}
      />
    </div>
  );
}

export default App;