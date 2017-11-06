import React from 'react'
import {  Link } from 'react-router-dom'
import { ROUTES } from './constants'
import BookShelf from './BookShelf'

const Library =({currentlyReading, wantToRead, read, onSelectBookShelf}) =>  (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
            <BookShelf 
                shelfTitle="Currently Reading"
                books={currentlyReading}
                onSelectBookShelf={onSelectBookShelf}
            />
            <BookShelf 
                shelfTitle="Want to Read"
                books={wantToRead}
                onSelectBookShelf={onSelectBookShelf}
            />
            <BookShelf 
                shelfTitle="Read"
                books={read}
                onSelectBookShelf={onSelectBookShelf}
            />
            </div>
        </div>
        <div className="open-search">
            <Link to={ROUTES.SEARCH}>Add a book</Link>
        </div>
    </div>
)

export default Library;
