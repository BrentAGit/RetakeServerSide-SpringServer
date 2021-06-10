package thomasmore.be.restapplication.controllers;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import thomasmore.be.restapplication.model.Book;
import thomasmore.be.restapplication.repositories.BookRepository;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@Slf4j
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @CrossOrigin
    @ApiOperation(value="Returns a list of all books stored in the database")
    @GetMapping("/books")
    private Iterable<Book> findAll(@RequestParam(required = false) String titleKeyWord) {
        log.info("findAll");

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
    public Book create(@Valid @RequestBody Book book){
        log.info("create");
        if(bookRepository.findByTitle(book.getTitle()).isPresent())
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, String.format("Book with title %s already exists.", book.getTitle()));
        }
        return bookRepository.save(book);
    }

    @CrossOrigin
    @ApiOperation(value="Removes a book from the database")
    @DeleteMapping("/books/{id}")
    public void delete(@PathVariable int id) {
        log.info("delete");
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isPresent()) {
            bookRepository.deleteById(id);
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, String.format("Book with id %d was not found in the database.", id));
        }
    }

    @CrossOrigin
    @ApiOperation(value="Edits a book from the database")
    @PutMapping("/books/{id}")
    public Book edit(@PathVariable int id, @RequestBody Book book) {
        log.info("edit");
        if (book.getId()!=id){
            return null;}
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isPresent()) {
            return bookRepository.save(book);
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, String.format("Book with id %d was not found in the database.", id));
        }
    }
}
