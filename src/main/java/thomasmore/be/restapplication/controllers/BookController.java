package thomasmore.be.restapplication.controllers;

import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import thomasmore.be.restapplication.model.Book;
import thomasmore.be.restapplication.repositories.BookRepository;

import java.util.Optional;

@RestController
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    Logger logger = LoggerFactory.getLogger(BookController.class);

    @CrossOrigin
    @ApiOperation(value="Returns a list of all books stored in the database")
    @GetMapping("/books")
    private Iterable<Book> findAll(@RequestParam(required = false) String titleKeyWord) {
        logger.info("findAll");

        if (titleKeyWord == null){
            return bookRepository.findAll();
        }
        else {
            return bookRepository.findByTitleContaining(titleKeyWord);
        }
    }

    @CrossOrigin
    @ApiOperation(value="Adds a book to the database")
    @PostMapping("/books")
    public Book create(@RequestBody Book book){
        logger.info("create");
        return bookRepository.save(book);
    }

    @CrossOrigin
    @ApiOperation(value="Removes a book from the database")
    @DeleteMapping("/books/{id}")
    public void delete(@PathVariable int id) {
        logger.info("delete");
        bookRepository.deleteById(id);
    }

    @CrossOrigin
    @ApiOperation(value="Edits a book from the database")
    @PutMapping("/books/{id}")
    public Book edit(@PathVariable int id, @RequestBody Book book) {
        logger.info("edit");
        if (book.getId()!=id){
            return null;}
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isPresent()) {
            return bookRepository.save(book);
        }
        return null;
    }
}
