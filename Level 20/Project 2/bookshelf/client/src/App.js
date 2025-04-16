
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [collection, setCollection] = useState([]);
  const [filter, setFilter] = useState('');

  const searchBooks = async () => {
    const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    setSearchResults(res.data.map(book => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      bookId: book.id
    })));
  };

  const addToCollection = async (book, status) => {
    const newBook = { ...book, status, rating: 0, notes: '' };
    await axios.post('http://localhost:5000/api/books', newBook);
    fetchCollection();
  };

  const fetchCollection = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setCollection(res.data);
  };

  const updateBook = async (id, updates) => {
    await axios.put(`http://localhost:5000/api/books/${id}`, updates);
    fetchCollection();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchCollection();
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <div className="App">
      <h2>📚 BookShelf</h2>

      <input placeholder="Search books..." value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={searchBooks}>Search</button>

      <h3>Search Results</h3>
      <div className="books">
        {searchResults.map(book => (
          <div key={book.bookId} className="book-card">
            <img src={book.thumbnail} alt="" />
            <p>{book.title}</p>
            <p>{book.authors.join(', ')}</p>
            <select onChange={e => addToCollection(book, e.target.value)}>
              <option>Add to...</option>
              <option>Read</option>
              <option>Currently Reading</option>
              <option>Want to Read</option>
            </select>
          </div>
        ))}
      </div>

      <h3>My Collection</h3>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Read">Read</option>
        <option value="Currently Reading">Currently Reading</option>
        <option value="Want to Read">Want to Read</option>
      </select>

      <div className="books">
        {collection.filter(b => !filter || b.status === filter).map(book => (
          <div key={book._id} className="book-card">
            <img src={book.thumbnail} alt="" />
            <p>{book.title}</p>
            <p>Status: {book.status}</p>
            <input
              type="number"
              min="1"
              max="5"
              value={book.rating || ''}
              placeholder="Rate (1-5)"
              onChange={e => updateBook(book._id, { rating: Number(e.target.value) })}
            />
            <textarea
              placeholder="Your notes..."
              value={book.notes}
              onChange={e => updateBook(book._id, { notes: e.target.value })}
            />
            <button onClick={() => deleteBook(book._id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
