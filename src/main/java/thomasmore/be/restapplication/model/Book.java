package thomasmore.be.restapplication.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import javax.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookid_gen")
    @SequenceGenerator(name = "bookid_gen", sequenceName = "book_seq", allocationSize = 1)
    private int id;

    @NotBlank(message="Book title should not be blank")
    private String title;

    @NotBlank(message="Book author should not be blank")
    private String author;

    @NotBlank(message="Book year should not be blank")
    @Max(value = 2021, message = "You are not from the future")
    @Min(value = 0, message = "That is a very very very old book")
    private int releaseYear;

    public Book() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }
}
