package thomasmore.be.restapplication.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thomasmore.be.restapplication.model.Book;
import thomasmore.be.restapplication.repositories.BookRepository;

import java.util.List;

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
}
