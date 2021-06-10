import {useState, useEffect} from "react"

import './App.css';
import CreateBookForm from "./components/CreateBookForm";
import EditBookForm from "./components/EditBookForm";
import DeleteBookButton from "./components/DeleteBookButton";
import LoginBanner from "./components/LoginBanner";
import Login from "./components/Login";

async function fetchWithCsrf(url, fetchOptions) {
    const cookie = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
    const csrfToken = cookie && cookie[1];
    console.log(`fetchWithCredentials token=${csrfToken}`);
    const headers = csrfToken ? {...fetchOptions.headers, 'X-XSRF-TOKEN': csrfToken} : fetchOptions.headers;
    const optionsWithCredentials = {
        ...fetchOptions,
        'credentials': 'include',
        headers
    };
    return await fetch(url, optionsWithCredentials);
}

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [username, setUsername] = useState();

    function addBook(book) {
        setBooks([...books, book]);
    }

    function updateBook(book) {
        setBooks(books.map((b) => b.id === book.id ? book : b));
    }

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
            const response = await fetchWithCsrf(`/books`, fetchOptions);
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

    async function authenticate(username, password) {
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    authorization: "Basic " + window.btoa(`${username}:${password}`)
                },
            };
            const response = await fetch(`/authenticate`, fetchOptions);
            const body = await response.json();
            setUsername(body.username);
            setErrorMessage();
        } catch (e) {
            setErrorMessage("Login error");
        }
        setIsLoading(false);
    }

    async function refreshAuthentication() {
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            };
            const response = await fetch(`/authenticate`, fetchOptions);
            const body = await response.json();
            setUsername(body.username);
        } catch (e) {

        }
        setIsLoading(false);
    }

    async function logout() {
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
            };
            const response = await fetchWithCsrf(`/logout`, fetchOptions);
            if (response.ok) {
                setUsername(undefined);
                setErrorMessage();
            } else {
                const body = await response.json();
                console.log(`logout: ERROR: ${response.status} - ${body.error} - ${body.message} `);
            }
        } catch (e) {

        }
        setIsLoading(false);
    }

    useEffect(() => {
        console.log(`useEffect: username ${username}`);
        if (username)
            getBooks();
    }, [username]);

    useEffect(() => {
        console.log("useEffect: start");
        if (document.cookie)
            refreshAuthentication();
    }, []);

  return (
    <div className="App">
        {username ? <LoginBanner username={username}/> : null}
        {books.map((b) => <div key={b.id}>
            <p onClick={() => {setCurrentSelected({...b}) ; setIsEdit(!isEdit)}}>{b.id}. {b.title} - {b.author} [{b.releaseYear}]</p>
            <DeleteBookButton selectedBook={b} errorMessage={errorMessage}
                              setErrorMessage={setErrorMessage}
                              setBooks={setBooks}
                              books={books}
                              fetch={fetchWithCsrf}/>
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
                          setErrorMessage={setErrorMessage}
                          fetch={fetchWithCsrf}/>
                          :
            <CreateBookForm setIsLoading={setIsLoading}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                            addBook={addBook}
                            fetch={fetchWithCsrf}/>}
                            <div style={{paddingTop: "10px"}}>
                                <button onClick={getBooks}>Refresh Page</button>
                            </div>
        <Login username={username} authenticate={authenticate}/>
        <div style={{paddingTop: "10px"}}>
            {username ? <button onClick={logout}>Logout</button> : null}
        </div>
    </div>
  );
}

export default App;
