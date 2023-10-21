import { GetStaticProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "styles/Articles.module.scss"; // Import the CSS module

interface ArticlesProps {
  articles: ArticlesInterface[];
}

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubYear: string;
  doi: string;
  claim: string;
  evidence: string;
  status: boolean; // Include the status field
}

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const [moderatedArticles, setModeratedArticles] = useState(articles);

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubYear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  const handleApprove = (articleId: string) => {
    // Send a request to your backend to update the status to "true"
    axios.put(`http://localhost:8082/api/articles${articleId}`)
      .then(() => {
        // Remove the approved article from the moderatedArticles state
        setModeratedArticles((articles) => articles.filter((article) => article.id !== articleId));
      })
      .catch((error) => {
        console.error('Error approving article:', error);
      });
  };

  const handleDecline = (articleId: string) => {
    // Send a request to your backend to decline or remove the article
    axios.delete(`http://localhost:8082/api/articles${articleId}`)
      .then(() => {
        // Remove the declined article from the moderatedArticles state
        setModeratedArticles((articles) => articles.filter((article) => article.id !== articleId));
      })
      .catch((error) => {
        console.error('Error declining article:', error);
      });
  };

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {moderatedArticles.map((article) => (
            <tr key={article.id} className={styles.row}>
              {headers.map((header) => (
                <td key={header.key}>{article[header.key]}</td>
              ))}
              <td>
                <button onClick={() => handleApprove(article.id)}>Approve</button>
                <button onClick={() => handleDecline(article.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    // Fetch articles from your backend API
    const response = await axios.get('http://localhost:8082/api/article'); // Replace with your actual API endpoint
    const articles: ArticlesInterface[] = response.data;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Articles;
