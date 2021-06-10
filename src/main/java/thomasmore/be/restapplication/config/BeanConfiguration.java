package thomasmore.be.restapplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import thomasmore.be.restapplication.services.GenreService;
import thomasmore.be.restapplication.services.GenreServiceImpl;

@Configuration
public class BeanConfiguration {
    @Bean
    GenreService getGenreService() {
        return new GenreServiceImpl();
    }
}
