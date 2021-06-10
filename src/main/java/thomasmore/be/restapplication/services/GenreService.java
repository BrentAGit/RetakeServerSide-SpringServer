package thomasmore.be.restapplication.services;

import org.springframework.stereotype.Service;
import thomasmore.be.restapplication.model.Genre;

@Service
public interface GenreService {
    Iterable<Genre> findAll();
}
