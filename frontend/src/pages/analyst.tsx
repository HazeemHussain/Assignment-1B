import { GetStaticProps, NextPage } from "next";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from 'axios';
import styles from "styles/Articles.module.scss"; // Import the CSS module

//Deploying changes to main

interface ArticlesProps {
  articles: ArticlesInterface[];
}

interface ArticlesInterface {
  _id: string; //using the _id property to get the id of the articles from mongodb
  title: string;
  authors: string;
  source: string;
  pubYear: string;
  doi: string;
  claim: string;
  evidence: string;
  summary: string;
  status: boolean; // Include the status field
  analystStatus: boolean;
}

const Articles: NextPage<ArticlesProps> = ({ articles }) => {

  const unapprovedArticles = articles.filter(article => article.analystStatus === false);

  const [moderatedArticles, setModeratedArticles] = useState(unapprovedArticles);


  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    //{ key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubYear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>, articleId: string) => {
    const updatedArticles = moderatedArticles.map(article => {
      if (article._id === articleId) { // Use articleId here
        return { ...article, summary: e.target.value };
      }
      return article;
    });
    setModeratedArticles(updatedArticles);
  };

  const handleSummarySave = async (articleId: string) => {
    const article = moderatedArticles.find(a => a._id === articleId); // Use articleId here
    if (article) {
      // Check if the summary is not blank
      if (!article.summary.trim()) {
        alert('Summary cannot be blank. Please add a summary.');
        return;
      }

      try {
        await axios.put(`http://localhost:8082/api/article/update-summary/${articleId}`, { // Use articleId here
          summary: article.summary,
        });
        alert('Summary saved!');
        window.location.reload();
      } catch (error) {
        console.error('Error saving summary:', error);
        alert('Error saving summary. Please try again.');
      }
    }
  };



  return (
    <div className="container">
      <h1>Analyst View </h1>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {moderatedArticles.map((article) => (
            <>
              <tr key={article._id} className={styles.row}>
                {headers.map((header) => (
                  <td key={header.key}>{article[header.key]}</td>
                ))}
              </tr>
              <tr>
                <td colSpan={headers.length}>
                  <textarea
                    placeholder="Enter summary"
                    value={article.summary}
                    onChange={(e) => handleSummaryChange(e, article._id)}
                  />
                </td>
                <td>
                  <button onClick={() => handleSummarySave(article._id)}>
                    Save Summary
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    // Fetch articles from your backend API
    const response = await axios.get('http://localhost:8082/api/article');
    const articles: ArticlesInterface[] = response.data;

    // Log the articles to the console to check if the id field is present
    //console.log('Articles received through props:', articles);

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
