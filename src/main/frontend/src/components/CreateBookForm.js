import {useState} from "react"

function CreateBookForm(props) {
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [releaseYear, setReleaseYear] = useState();

    async function createBook(book){
        console.log("createBook");
        props.setIsLoading(true);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(book)
        };
        try{
            const response = await fetch ("/books", fetchOptions);
            const body = await response.json();
            if(response.ok){
                console.log(`createBook: received response ${JSON.stringify(body)}`);
                props.addBook(body);
                console.log(`createBook: done!`);
            }
            else{
                console.log(`createBook: ERROR: ${response.status} - ${body.error} - ${body.message}`);
                const errorMessage = body.errors && body.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage} -=-`, "-=- ");
                console.log(`${JSON.stringify(body)}`);
                console.log(`${errorMessage}`);
                props.setErrorMessage(errorMessage || body.message);
            }
        }
        catch(e){
            console.log(`getBooks: ERROR: ${e}`);
            props.setErrorMessage("Connection Error");
        }
        props.setIsLoading(false);
    }

    return (
        <div style={{paddingTop: "50px"}}>
            <b>Add a new book to the list</b>
            <div style={{paddingTop: "10px"}}>
                Title of the book: <br/>
                <input required value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div >
            <div style={{paddingTop: "10px"}}>
                Author of the book: <br/>
                <input required pattern={"[a-zA-Z][a-zA-Z]"} value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </div >
            <div style={{paddingTop: "10px"}}>
                Release year of the book: <br/>
                <input min={0} max={2021} value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)}/>
            </div>
            <div style={{paddingTop: "10px"}}>
                <button onClick={() => createBook({'title': title, 'author': author, 'releaseYear': releaseYear})}>Create book!</button>
            </div>
        </div>
    );
}

export default CreateBookForm;
