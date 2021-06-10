package thomasmore.be.restapplication.repositories;

import org.springframework.data.repository.CrudRepository;
import thomasmore.be.restapplication.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
