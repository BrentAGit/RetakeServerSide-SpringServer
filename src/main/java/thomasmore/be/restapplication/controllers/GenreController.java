package thomasmore.be.restapplication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import thomasmore.be.restapplication.model.Genre;
import thomasmore.be.restapplication.services.GenreService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GenreController {
    @Autowired
    GenreService genreService;

    @CrossOrigin
    @GetMapping("/genres")
    public Iterable<Genre> findAll() {
        log.info("findAll Genres");
        return genreService.findAll();
    }
}
