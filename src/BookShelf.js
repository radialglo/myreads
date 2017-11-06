import React from 'react'
import BooksGrid from './BooksGrid'

const BookShelf = ({shelfTitle, books, onSelectBookShelf}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
            <BooksGrid 
                books={books}
                onSelectBookShelf={onSelectBookShelf}
            />
        </div>
    </div>
)

export default BookShelf;
