/**
 * Represents a book with its details.
 */
export interface Book {
  /**
   * The ISBN (International Standard Book Number) of the book.
   */
  isbn: string;
  /**
   * The title of the book.
   */
  title: string;
  /**
   * The author of the book.
   */
  author: string;
  /**
   * The URL of the book cover image.
   */
  coverImageUrl: string;
  /**
   * The edition of the book.
   */
  edition: number;
}

let mockBooks: Book[] = [
  {
    isbn: '978-0321765723',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverImageUrl: 'https://picsum.photos/200/300',
    edition: 1
  },
  {
    isbn: '978-0743273565',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    coverImageUrl: 'https://picsum.photos/200/300',
    edition: 1
  },
];

/**
 * Asynchronously retrieves a book by its ISBN.
 *
 * @param isbn The ISBN of the book to retrieve.
 * @returns A promise that resolves to a Book object if found, or null if not found.
 */
export async function getBookByISBN(isbn: string): Promise<Book | null> {
  return mockBooks.find(book => book.isbn === isbn) || null;
}

/**
 * Asynchronously retrieves all books.
 *
 * @returns A promise that resolves to an array of Book objects.
 */
export async function getAllBooks(): Promise<Book[]> {
  return mockBooks;
}

/**
 * Asynchronously updates the edition of a book based on its ISBN.
 *
 * @param isbn The ISBN of the book to update.
 * @param edition The new edition number.
 * @returns A promise that resolves to true if the update was successful, or false otherwise.
 */
export async function updateBookEdition(isbn: string, edition: number): Promise<boolean> {
  const bookIndex = mockBooks.findIndex(book => book.isbn === isbn);
  if (bookIndex > -1) {
    mockBooks[bookIndex] = { ...mockBooks[bookIndex], edition: edition };
    return true;
  }
  return false;
}

/**
 * Asynchronously deletes a book based on its ISBN.
 *
 * @param isbn The ISBN of the book to delete.
 * @returns A promise that resolves to true if the deletion was successful, or false otherwise.
 */
export async function deleteBook(isbn: string): Promise<boolean> {
  mockBooks = mockBooks.filter(book => book.isbn !== isbn);
  return true;
}

/**
 * Asynchronously inserts book details.
 *
 * @param book The book to be inserted.
 * @returns A promise that resolves to true if the insertion was successful, or false otherwise.
 */
export async function insertBook(book: Book): Promise<boolean> {
  mockBooks.push(book);
  return true;
}
