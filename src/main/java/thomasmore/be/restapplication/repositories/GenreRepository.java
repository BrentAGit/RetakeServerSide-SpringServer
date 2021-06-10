package thomasmore.be.restapplication.repositories;

import org.springframework.data.repository.CrudRepository;
import thomasmore.be.restapplication.model.Genre;

public interface GenreRepository extends CrudRepository<Genre, Integer> {

}
