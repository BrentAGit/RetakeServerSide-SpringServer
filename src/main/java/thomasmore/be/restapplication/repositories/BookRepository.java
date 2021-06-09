package thomasmore.be.restapplication.repositories;

import org.springframework.data.repository.CrudRepository;
import thomasmore.be.restapplication.model.Book;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findAll();

    Iterable<Book> findByTitleContaining(String titleKeyWord);
}
