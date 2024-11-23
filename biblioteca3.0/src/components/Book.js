import React from "react";

const Book = ({ book, onChangeShelf }) => {
  const { title, authors, imageLinks, shelf, infoLink } = book;

  const handleShelfChange = (event) => {
    onChangeShelf(book, event.target.value);
  };
  const handleClick = () => {
    if (infoLink) {
      window.open(infoLink, "_blank");
    }
  };

  return (
    <div className="book" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="book-thumbnail">
        {/* Verifica se o thumbnail existe antes de renderizá-lo */}
        {imageLinks?.thumbnail ? (
          <img src={imageLinks.thumbnail} alt={`${title} cover`} />
        ) : (
          <div className="no-thumbnail">Sem Capa</div>
        )}
      </div>
      <div className="book-details">
        <h3>{title}</h3>
        {/* Verifica se existem autores antes de renderizá-los */}
        {authors && authors.length > 0 ? (
          <p>{authors.join(", ")}</p>
        ) : (
          <p>Autor não disponível</p>
        )}
        <select
          value={shelf || "none"}
          onChange={handleShelfChange}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="none" disabled>
            Mover para...
          </option>
          <option value="currentlyReading">Estou lendo</option>
          <option value="wantToRead">Quero ler</option>
          <option value="read">Já lido</option>
          <option value="none">Tirar da estante</option>
        </select>
      </div>
    </div>
  );
};

export default Book;
