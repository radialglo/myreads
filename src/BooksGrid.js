import React from 'react'
import Book from './Book'

const BooksGrid = ({books, onSelectBookShelf}) => (
    <ol className="books-grid">
        {books.map((book) => (
            <li key={book.id}>
                <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    bookCover={book.bookCover}
                    shelf={book.shelf}
                    onSelectBookShelf={onSelectBookShelf}
                />
            </li>
        ))}
    </ol>
)

export default BooksGrid;
