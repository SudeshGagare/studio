import React, { useState, useEffect } from 'react';

function BookForm({ book, addBook }) {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [edition, setEdition] = useState('');

  useEffect(() => {
    if (book) {
      setIsbn(book.isbn);
      setTitle(book.title);
      setAuthor(book.author);
      setCoverImageUrl(book.coverImageUrl);
      setEdition(book.edition);
    } else {
      setIsbn('');
      setTitle('');
      setAuthor('');
      setCoverImageUrl('');
      setEdition('');
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      isbn,
      title,
      author,
      coverImageUrl,
      edition,
    };
    addBook(newBook);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="coverImageUrl">Cover Image URL:</label>
        <input
          type="text"
          id="coverImageUrl"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="edition">Edition:</label>
        <input
          type="number"
          id="edition"
          value={edition}
          onChange={(e) => setEdition(parseInt(e.target.value))}
          required
        />
      </div>
      <button type="submit">{book ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
}

export default BookForm;