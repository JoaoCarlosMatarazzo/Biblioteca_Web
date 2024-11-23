import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import BookShelf from "./components/BookShelf";
import SearchPage from "./components/SearchPage";
import Header from "./components/Header"; // Importando o Header
import "./App.css";

const App = () => {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleShelfChange = (book, newShelf) => {
    setBooks((prevBooks) => {
      const existingBook = prevBooks.find((b) => b.id === book.id);
      if (existingBook) {
        if (newShelf === "none") {
          // Remove o livro ao escolher "Tirar da estante"
          return prevBooks.filter((b) => b.id !== book.id);
        }
        // Atualiza a estante do livro
        return prevBooks.map((b) =>
          b.id === book.id ? { ...b, shelf: newShelf } : b
        );
      } else {
        // Adiciona o livro se não existir
        return [...prevBooks, { ...book, shelf: newShelf }];
      }
    });
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/search"
          element={<SearchPage books={books} onChangeShelf={handleShelfChange} />}
        />
        <Route
          path="/"
          element={
            <>
              <BookShelf
                title="Estou lendo"
                books={books.filter((book) => book.shelf === "currentlyReading")}
                onChangeShelf={handleShelfChange}
              />
              <BookShelf
                title="Quero ler"
                books={books.filter((book) => book.shelf === "wantToRead")}
                onChangeShelf={handleShelfChange}
              />
              <BookShelf
                title="Já lido"
                books={books.filter((book) => book.shelf === "read")}
                onChangeShelf={handleShelfChange}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
