import React from 'react'
import { SHELVES } from './constants'

class Book extends React.Component {
    onSelectChange = (e) => {
        const {
            id,
            title,
            bookCover,
            authors,
            onSelectBookShelf,
        } = this.props;

        const shelf = e.target.value;
        if (onSelectBookShelf) {
            onSelectBookShelf({
                id,
                title,
                bookCover,
                authors,
            }, shelf);
        }
    }

    render() {
        const {
            title,
            bookCover,
            authors,
            shelf,
        } = this.props;

        return  (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover">
                        <img src={bookCover} alt={title}/>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={this.onSelectChange}>
                            <option value={SHELVES.NONE} disabled>Move to...</option>
                            <option value={SHELVES.CURRENTLY_READING}>Currently Reading</option>
                            <option value={SHELVES.WANT_TO_READ}>Want to Read</option>
                            <option value={SHELVES.READ}>Read</option>
                            <option value={SHELVES.NONE}>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                {console.log(authors)}
                {authors && <div className="book-authors">
                        {authors.join(", ")}
                </div>}
            </div>
        )
    }
}

export default Book;
