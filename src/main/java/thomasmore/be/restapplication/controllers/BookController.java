package thomasmore.be.restapplication.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thomasmore.be.restapplication.model.Book;
import thomasmore.be.restapplication.repositories.BookRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    Logger logger = LoggerFactory.getLogger(BookController.class);

    @CrossOrigin
    @GetMapping("/books")
    private List<Book> findAll() {
        logger.info("findAll");
        return bookRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/books")
    public Book create(@RequestBody Book book){
        logger.info("create");
        return bookRepository.save(book);
    }

    @CrossOrigin
    @DeleteMapping("/books/{id}")
    public void delete(@PathVariable int id) {
        logger.info("delete");
        bookRepository.deleteById(id);
    }

    @CrossOrigin
    @PutMapping("/books/{id}")
    public Book edit(@PathVariable int id, @RequestBody Book book) {
        logger.info("edit");
        if (book.getId()!=id) return null;
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isPresent()) {
            return bookRepository.save(book);
        }
        return null;
    }
}
