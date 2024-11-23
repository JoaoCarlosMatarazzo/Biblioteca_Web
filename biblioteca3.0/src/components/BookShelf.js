import React from "react";
import Book from "./Book";

const BookShelf = ({ title, books, onChangeShelf }) => (
  <div className="bookshelf">
    <h2>{title}</h2>
    <div className="bookshelf-books">
      {books.map((book) => (
        <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
      ))}
    </div>
  </div>
);

export default BookShelf;
