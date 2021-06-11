package thomasmore.be.restapplication.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookid_gen")
    @SequenceGenerator(name = "bookid_gen", sequenceName = "book_seq", allocationSize = 1)
    private int id;

    @NotBlank(message = "Book title should not be blank")
    private String title;

    @NotBlank(message = "Book author should not be blank")
    private String author;

    @Max(value = 2021, message = "You are not from the future")
    @Min(value = 0, message = "That is a very very very old book")
    private int releaseYear;
}
