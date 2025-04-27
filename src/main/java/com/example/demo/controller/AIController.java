package com.example.demo.controller;

import com.example.demo.entity.Book;
import com.example.demo.service.AIService;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AIController {

    @Autowired
    private AIService aiService;

    @Autowired
    private BookService bookService;

    @GetMapping("/books/{isbn}/summary")
    public String getBookSummary(@PathVariable String isbn) {
        Optional<Book> bookOptional = bookService.getBookByISBN(isbn);
        if(bookOptional.isPresent()){
            Book book = bookOptional.get();
            return aiService.generateBookSummary(book.getTitle(), book.getAuthor());
        }
        return "Book not found";
    }
}