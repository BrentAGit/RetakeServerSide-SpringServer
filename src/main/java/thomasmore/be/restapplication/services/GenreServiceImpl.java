package thomasmore.be.restapplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import thomasmore.be.restapplication.model.Genre;
import thomasmore.be.restapplication.repositories.GenreRepository;

public class GenreServiceImpl implements GenreService {
    @Autowired
    GenreRepository genreRepository;

    @Override
    public Iterable<Genre> findAll() {
        return null;
    }
}
