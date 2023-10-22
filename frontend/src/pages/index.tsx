import React, { Key, useState } from 'react';
import axios from 'axios';
import styles from 'styles/Articles.module.scss'; // Import the CSS module
import { NextPage } from 'next';
import config from '@/config';

//Home page

interface ArticlesProps {
  articles: ArticlesInterface[];
}

interface ArticlesInterface {
  _id: Key | null | undefined;
  id: string;
  title: string;
  authors: string;
  source: string;
  pubYear: string;
  doi: string;
  claim: string;
  evidence: string;
  summary: string;
}

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ArticlesInterface[]>([]); // Annotate with the Article interface
  const [showSearchResults, setShowSearchResults] = useState(false); // To toggle between articles and search results

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'source', label: 'Source' },
    { key: 'pubYear', label: 'Publication Year' },
    { key: 'doi', label: 'DOI' },
    { key: 'claim', label: 'Claim' },
    { key: 'evidence', label: 'Evidence' },
  ];

  const handleSearch = () => {
    axios
      .get(`${config.apiUrl}/api/article/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
        setShowSearchResults(true);
      })
      .catch((error) => {
        console.error(error);
        setShowSearchResults(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1>SPEED</h1>

      <div className={styles['centered-search-bar']}>
        <input
          type="text"
          placeholder="Enter the article name or the author name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {showSearchResults ? (
        <div>
          <h2>Search Results:</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header.key}>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchResults.map((article) => (
                <tr key={article._id} className={styles.row}>
                  {headers.map((header) => (
                    <td key={header.key}>{article[header.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Articles;
