import {useState, useEffect} from "react"

import './App.css';
import CreateBookForm from "./components/CreateBookForm";
import EditBookForm from "./components/EditBookForm";
import DeleteBookButton from "./components/DeleteBookButton";

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    function addBook(book) {
        setBooks([...books, book]);
    }

    function updateBook(book) {
        setBooks(books.map((b) => b.id === book.id ? book : b));
    }

    console.log("rendering App()...");

    useEffect(() => {
        console.log("Start of useEffect...");

        async function getBooks() {
            try{
                console.log("Start of async getBooks...");
                setIsLoading(true);
                const fetchOptions = {
                    method: 'GET',
                    'credentials': 'include',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                };
                const response = await fetch(`/books`, fetchOptions);
                const body = await response.json();
                console.log("Received response in getBooks...");
                setBooks(body);
                console.log("getBooks Done!");
            }
            catch(e){
                console.log(`getBooks: ERROR: ${e}`);
                setErrorMessage("Connection Error")
            }
            setIsLoading(false);
        }

        getBooks();
        setIsLoading(false);
        console.log("useEffect: finished getBooks...");
        console.log("useEffect: Done!");
    }, []);

  return (
    <div className="App">
        {books.map((b) => <div key={b.id}>
            <p onClick={() => {setCurrentSelected({...b}) ; setIsEdit(!isEdit)}}>{b.id}. {b.title} - {b.author} [{b.releaseYear}]</p>
            <DeleteBookButton selectedBook={b} errorMessage={errorMessage}
                              setErrorMessage={setErrorMessage}
                              setBooks={setBooks}
                              books={books}/>
        </div>)}
        <div style={{paddingTop: "50px"}}>{errorMessage}</div>
        {isLoading ? <p>Loading data...</p> : false}
        {isEdit ?
            <EditBookForm setIsLoading={setIsLoading}
                          setIsEdit={setIsEdit}
                          isEdit={isEdit}
                          updateBook={updateBook}
                          currentSelected={currentSelected}
                          setCurrentSelected={setCurrentSelected}
                          errorMessage={errorMessage}
                          setErrorMessage={setErrorMessage}/>
                          :
            <CreateBookForm setIsLoading={setIsLoading}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                            addBook={addBook}/>}
    </div>
  );
}

export default App;
