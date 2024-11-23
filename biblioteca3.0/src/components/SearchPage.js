import React, { useState, useEffect } from "react";
import Book from "./Book";

const SearchPage = ({ books, onChangeShelf }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    if (searchTerm) {
      try {
        const response = await fetch(
          `https://api-books-dot-api-samples-423102.uc.r.appspot.com/api/books`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer 12113194",
            },
          }
        );
        const data = await response.json();

        const filteredResults = data
          .filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => {
            const existingBook = books.find((b) => b.id === book.id);
            return existingBook
              ? { ...book, shelf: existingBook.shelf }
              : { ...book, shelf: "none" };
          });

        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    setSearchResults((prevResults) =>
      prevResults.map((result) => {
        const updatedBook = books.find((b) => b.id === result.id);
        return updatedBook ? { ...result, shelf: updatedBook.shelf } : result;
      })
    );
  }, [books]);

  return (
    <div className="search-page">
      <h1>Coleção de Livros</h1>
      <input
        type="text"
        placeholder="Pesquisar livros..."
        value={query}
        onChange={handleSearch}
      />
      <div className="search-results">
        {query &&
          searchResults.map((book) => (
            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
