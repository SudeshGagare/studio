"use client";

import { useState, useEffect } from 'react';
import { Book, getAllBooks, insertBook, deleteBook, updateBookEdition } from '@/services/book-service';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Delete, Edit, Plus, Search } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from '@/components/ui/textarea';

const bookSchema = z.object({
  isbn: z.string().min(1, { message: "ISBN is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  coverImageUrl: z.string().url({ message: "Invalid URL." }),
  edition: z.preprocess(
    (a) => parseInt(String(a), 10),
    z.number().min(1, { message: "Edition must be at least 1." })
  ),
});

const editionSchema = z.object({
  edition: z.preprocess(
    (a) => parseInt(String(a), 10),
    z.number().min(1, { message: "Edition must be at least 1." })
  ),
});

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<Book | null>(null);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      isbn: "",
      title: "",
      author: "",
      coverImageUrl: "",
      edition: 1,
    },
  });

  const editForm = useForm<z.infer<typeof editionSchema>>({
    resolver: zodResolver(editionSchema),
    defaultValues: {
      edition: 1,
    },
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const allBooks = await getAllBooks();
    setBooks(allBooks);
  };

  const handleBookSelect = async (isbn: string) => {
    const book = books.find(b => b.isbn === isbn);
    if (book) {
      setSelectedBook(book);
      try {
        const summaryData = await generateBookSummary({ title: book.title, author: book.author });
        setSummary(summaryData?.summary || 'No summary found.');
      } catch (error) {
        setSummary('Failed to load summary.');
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    try {
      await insertBook(values);
      loadBooks();
      toast({
        title: "Book added successfully!",
        description: `The book "${values.title}" has been added to the list.`,
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding book!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const onEditSubmit = async (values: z.infer<typeof editionSchema>) => {
    if (!selectedBookForEdit) return;
    try {
      await updateBookEdition(selectedBookForEdit.isbn, values.edition);
      loadBooks();
      toast({
        title: "Edition updated!",
        description: `Edition for book "${selectedBookForEdit.title}" has been updated to ${values.edition}.`,
      });
      setEditForm.reset();
      setEditOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating edition!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const handleDeleteBook = async (isbn: string) => {
    try {
      await deleteBook(isbn);
      loadBooks();
      toast({
        title: "Book deleted!",
        description: `Book with ISBN "${isbn}" has been deleted.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting book!",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const handleOpenEdit = (book: Book) => {
    setSelectedBookForEdit(book);
    setEditForm.setValue("edition", book.edition);
    setEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-primary">ShelfView</h1>
        <p className="text-muted-foreground">Your personal online bookshelf.</p>
      </header>

      <section className="mb-8">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Book</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new book to your shelf.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input placeholder="978-0321765723" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="The Lord of the Rings" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="J.R.R. Tolkien" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/lotr.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="edition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edition</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Book</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-primary">Book List</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <Card key={book.isbn} className="transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>By {book.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <img src={book.coverImageUrl} alt={book.title} className="max-h-48 object-contain rounded" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => handleBookSelect(book.isbn)}>
                  <Search className="mr-2 h-4 w-4" /> View
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleOpenEdit(book)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteBook(book.isbn)}>
                    <Delete className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {selectedBook && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-primary">Book Details</h2>
          <Card>
            <CardHeader>
              <CardTitle>{selectedBook.title}</CardTitle>
              <CardDescription>By {selectedBook.author}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <img src={selectedBook.coverImageUrl} alt={selectedBook.title} className="max-h-64 object-contain rounded" />
              <div>
                <Label>ISBN</Label>
                <p>{selectedBook.isbn}</p>
              </div>
              <div>
                <Label>Edition</Label>
                <p>{selectedBook.edition}</p>
              </div>
              <div>
                <Label>Summary</Label>
                <Textarea readOnly value={summary || 'Loading...'} />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Edition</DialogTitle>
            <DialogDescription>
              Enter the new edition for the book.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="edition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edition</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Update Edition</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
