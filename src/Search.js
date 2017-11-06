import React from 'react'
import {  Link } from 'react-router-dom'
import { ROUTES } from './constants'
import BooksGrid from './BooksGrid'

const Search = ({query, searchResults, onSearchChange, onSelectBookShelf}) => (
    <div className="search-books">
        <div className="search-books-bar">
            <Link to={ROUTES.HOME} className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={query} onChange={onSearchChange} placeholder="Search by title or author"/>

            </div>
        </div>
        <div className="search-books-results">
            <BooksGrid 
                books={searchResults}
                onSelectBookShelf={onSelectBookShelf}
            />
        </div>
    </div>
)

export default Search;
