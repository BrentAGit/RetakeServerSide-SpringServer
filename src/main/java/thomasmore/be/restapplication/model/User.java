package thomasmore.be.restapplication.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Table(name = "BOOKSUSER")
@Data
@NoArgsConstructor
public class User {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_gen")
    @SequenceGenerator(name = "user_gen", sequenceName = "user_seq", allocationSize = 1)
    @Id
    private Integer id;
    String username;
    String password;
    String role;
}
