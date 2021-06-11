import {useState, useEffect} from "react"

import './App.css';
import CreateBookForm from "./components/CreateBookForm";
import EditBookForm from "./components/EditBookForm";
import DeleteBookButton from "./components/DeleteBookButton";
import LoginBanner from "./components/LoginBanner";
import Login from "./components/Login";

const csrfToken_keyInLocalStorage = "csrf_token";

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [username, setUsername] = useState();
    const [csrfToken, setCsrfToken] = useState(() => localStorage.getItem(csrfToken_keyInLocalStorage));

    async function fetchWithCsrf(url, fetchOptions) {
        console.log(`csrf token: ${csrfToken}`);
        const headers = csrfToken ? {...fetchOptions.headers, 'X-XSRF-TOKEN': csrfToken} : fetchOptions.headers;
        const optionsWithCredentials = {
            ...fetchOptions,
            'credentials': 'include',
            headers
        };
        return await fetch(url, optionsWithCredentials);
    }

    function showHeadersAndCookies(response) { //Haalt csrf token uit header
        for (let [key, value] of response.headers) {
            console.log(`--- response ${key} = ${value}`);
        }
        for (let cookie of document.cookie.split(";")) {
            console.log(`--- cookie ${cookie}`);
        }
    }


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
            showHeadersAndCookies(response);
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
        console.log(`authentication: ${username}`);
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
            showHeadersAndCookies(response);
            setCsrfToken(response.headers.get("x-xsrf-token") || csrfToken);
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
            const response = await fetchWithCsrf(`/authenticate`, fetchOptions);
            setCsrfToken(response.headers.get("x-xsrf-token") || csrfToken);
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
                setCsrfToken(undefined);
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
        console.log(`useEffect: username ${username} - getBooks (only if username is set)`);
        if (username)
            getBooks();
    }, [username, getBooks]);

    useEffect(() => {
        console.log(`useEffect: csrfToken ${csrfToken}: store in localStorage`);
        if (csrfToken)
            localStorage.setItem(csrfToken_keyInLocalStorage, csrfToken);
        else
            localStorage.removeItem(csrfToken_keyInLocalStorage);
    }, [csrfToken]);


    useEffect(() => {
        console.log("useEffect: start app: try to refreshAuthentication if cookie is set");
        refreshAuthentication();
    }, [refreshAuthentication]);

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
