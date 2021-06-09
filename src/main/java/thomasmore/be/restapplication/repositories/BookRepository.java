package thomasmore.be.restapplication.repositories;

import org.springframework.data.repository.CrudRepository;
import thomasmore.be.restapplication.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findAll();

    Iterable<Book> findByTitleContaining(String titleKeyWord);

    Optional<Book> findByTitle(String title);
}
