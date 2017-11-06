import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { ROUTES, SHELVES } from './constants'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    query: '',
    bookData: {},
    searchResults: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
      BooksAPI.getAll().then((data) => {
          let bookData = {};
          let wantToRead = [];
          let read = [];
          let currentlyReading = [];

          data.forEach((book) => {
              bookData[book.id] = {
                  id: book.id,
                  title: book.title,
                  authors: book.authors,
                  bookCover: book.imageLinks.thumbnail, 
                  shelf: book.shelf,
              };
              switch(book.shelf) {
                case SHELVES.CURRENTLY_READING:
                    currentlyReading.push(book.id);
                    break;
                case SHELVES.WANT_TO_READ:
                    wantToRead.push(book.id);
                    break;
                case SHELVES.READ:
                    read.push(book.id);
                    break;
                default:
                    break;
              }
              console.log(this);

              this.setState({
                  bookData,
                  currentlyReading,
                  wantToRead,
                  read,
              })
          })
      });
  }


  onSearchChange = (e) => {
      const query = e.target.value;
      const bookData = this.state.bookData;
      let searchResults;
      console.log(query);
      this.setState({
          query,
      });
      console.log(SHELVES.NONE);

      BooksAPI.search(query, 20).then((data) => {
          // handle error case
          // do some filter on the books
          if (data.error) {
              searchResults = data.items;
          } else {
            searchResults = data.map((book) => (
                {
                    id: book.id,
                    title: book.title,
                    authors: book.authors,
                    bookCover: book.imageLinks.thumbnail,
                    // TODO: update shelf data here if it exists or set to None
                    shelf: bookData[book.id] ? bookData[book.id].shelf :  SHELVES.NONE,
                }
            ))
          }
          this.setState({
            searchResults,
          });
          console.log(data);
      });
  }

  onSelectBookShelf = ({
    id,
    title,
    bookCover,
    authors,
  }, shelf)  => {
      console.log(shelf);
      BooksAPI.update({
          id: id
      }, shelf).then(({currentlyReading, wantToRead, read}) => {
          const { bookData, searchResults } = this.state; 
          let newBookData;
          let newSearchResults;
          console.log("foo");

          if (shelf === SHELVES.NONE) {
                newBookData = Object.keys(bookData).filter(bookId => bookId !== id)
                .reduce((result, current) => {
                    result[current] = Object.assign({}, bookData[current])
                    return result;
                }, {});
          }  else {
                if (bookData[id]) {
                    console.log("book changed");
                    console.log(shelf);
                    newBookData = Object.assign({}, {
                        ...bookData,
                        [id]: {
                            ...bookData[id],
                            shelf,
                        }
                    });
                    console.log(newBookData[id]);

                } else {
                    newBookData = Object.assign({}, {
                        ...bookData,
                        [id]: {
                            id,
                            title,
                            bookCover,
                            authors,
                            shelf,
                        }
                    });
                }
          }

          newSearchResults = searchResults.map((book) => (
              {
                  ...book,
                  shelf: newBookData[book.id] ? newBookData[book.id].shelf :  SHELVES.NONE,
              }
          ));


          console.log(bookData);
          console.log(bookData[id]);
          console.log(newBookData[id]);
          this.setState({
            currentlyReading, 
            wantToRead,
            read,
            bookData: newBookData,
            searchResults: newSearchResults,
          });
      });

      BooksAPI.getAll().then((data) => {
          console.log(data);
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path={ROUTES.SEARCH} render={() => (
            <Search
                query={this.state.query}
                searchResults={this.state.searchResults}
                onSearchChange={this.onSearchChange}
                onSelectBookShelf={this.onSelectBookShelf}
            />
        )}/>
        <Route exact path={ROUTES.HOME} render={() => (
            <Library
                currentlyReading={
                    this.state.currentlyReading.map((id) => (
                        this.state.bookData[id]
                    ))
                }
                wantToRead={
                    this.state.wantToRead.map((id) => (
                        this.state.bookData[id]
                    ))
                }
                read={
                    this.state.read.map((id) => (
                        this.state.bookData[id]
                    ))
                }
                onSelectBookShelf={this.onSelectBookShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
