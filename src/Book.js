import React from 'react'

const Book = ({title, bookCover, authors}) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover">
                <img src={bookCover}/>
            </div>
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
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

export default Book;
