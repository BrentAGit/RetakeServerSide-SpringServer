import React from "react"

function DeleteBookButton(props) {

    async function deleteBook(book) {
        console.log("async deleteBook");

        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(book)
        };
        try {
            const response = await fetch(`/books/${book.id}`, fetchOptions);
            if (response.ok) {
                console.log(`deleteBook: deleting book...`);
                props.setBooks(props.books.filter((b) => b.id !== book.id));
                console.log("deleteBook: deleted book");
            } else {
                const body = await response.json();
                console.log(`   async deleteBook: ERROR: ${response.status} - ${body.error} - ${body.message} `);
                props.setErrorMessage(body.message);
            }
        } catch (e) {
            console.log(`deleteBook: ERROR: ${e}`);
            props.setErrorMessage("Connection Error")
        }
        window.location.reload();
    }

    return (
        <div>
            <button onClick={() => deleteBook(props.selectedBook)}>Remove book</button>
        </div>
    );
}

export default DeleteBookButton;
