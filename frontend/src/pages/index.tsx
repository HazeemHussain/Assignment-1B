import React, { useState } from 'react';
import axios from 'axios';
import SortableTable from '../components/table/SortableTable'; // Import the table component
import styles from 'styles/Articles.module.scss'; // Import the CSS module

interface Article {
  _id: string;
  title: string;
  authors: string;
  source: string;
  pubYear: string;
  doi: string;
  summary: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]); // Annotate with the Article interface
  const [articles, setArticles] = useState<Article[]>([]); // Annotate with the Article interface
  const [showSearchResults, setShowSearchResults] = useState(false); // To toggle between articles and search results


  const handleSearch = () => {
    axios
      .get(`/api/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>I SHOW SPEED</h1>

      <div>
        <input
          type="text"
          placeholder="Search for articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h2>Search Results:</h2>
          {searchResults.map((article) => (
            <div key={article._id}>
              <h3>{article.title || 'Title not available'}</h3>
              <p>Authors: {article.authors || 'Authors not available'}</p>
              <p>Source: {article.source || 'Source not available'}</p>
              <p>Publication Year: {article.pubYear || 'Publication Year not available'}</p>
              <p>DOI: {article.doi || 'DOI not available'}</p>
              <p>Summary: {article.summary || 'Summary not available'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No search results available.</p>
      )}
    </div>
  );
}
