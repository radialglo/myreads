import React from 'react'
import Book from './Book'

const BooksGrid = ({books}) => (
    <ol className="books-grid">
        {console.log(books)}
        {books.map((book) => (
            <li key={book.id}>
                <Book
                    title={book.title}
                    authors={book.authors}
                    bookCover={book.imageLinks.thumbnail}
                />
            </li>
        ))}
    </ol>
)

export default BooksGrid;
