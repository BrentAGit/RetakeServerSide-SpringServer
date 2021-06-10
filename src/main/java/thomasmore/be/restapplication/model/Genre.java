package thomasmore.be.restapplication.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Data
@Entity
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "genreid_gen")
    @SequenceGenerator(name = "genreid_gen", sequenceName = "genre_seq", allocationSize = 1)
    private int id;

    @NotBlank(message="Genre name should not be blank")
    private String name;


}
