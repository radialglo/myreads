import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import { ROUTES } from './constants'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    query: '',
    searchResults: [],
  }

  onSearchChange = (e) => {
      const query = e.target.value;
      this.setState({
          query
      });

      console.log(query);

      BooksAPI.search(query, 20).then((data) => {
          // handle error case
          // do some filter on the books
          if (data.error) {
            this.setState({
                searchResults: data.items,
            });
          } else {
            this.setState({
                searchResults: data,
            });
          }
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
            />
        )}/>
        <Route exact path={ROUTES.HOME} render={() => (
            <Library
                wantToReadBooks={this.state.searchResults}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
