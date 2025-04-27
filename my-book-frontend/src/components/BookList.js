import React from 'react';

function BookList({ books, deleteBook, editBook }) {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            {book.title} by {book.author} (ISBN: {book.isbn}, Edition: {book.edition})
            <button onClick={() => editBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book.isbn)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;