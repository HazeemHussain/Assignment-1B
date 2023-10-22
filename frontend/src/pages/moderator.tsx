import { GetStaticProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "styles/Articles.module.scss"; // Import the CSS module
import config from "@/config";

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
  status: boolean; // Include the status field
}

const Articles: NextPage<ArticlesProps> = ({ articles }) => {

  const unapprovedArticles = articles.filter(article => article.status === false); // Only articles with status false
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

  //Function that is called when the user clicks on the approve button to approve the article
  const handleApprove = (articleId: string) => {
    // Display a confirmation dialog
    //const url = `${process.env.NEXT_PUBLIC_API_URL}/api/article/approve/${articleId}`;
    // console.log('Request URL:', url); // Log the URL
    console.log('Article ID to be approved', articleId);

    //Asking moderation for confirmation of the article
    const confirmApproval = window.confirm("Are you sure you want to approve this article?");

    if (confirmApproval) {
      axios.put(`${config.apiUrl}api/article/${articleId}`)
        .then(response => {
          console.log('Response:', response.data); // Log the response
          setModeratedArticles(articles => articles.filter(article => article._id !== articleId));
          alert("Article sent to analyst for review");
        })
        .catch(error => {
          console.error('Error approving article:', error);
        });
    }
  };

  //Function that is called when the user clicks on the decline button to decline the article
  const handleDecline = (articleId: string) => {
    console.log("Article Id to be removed", articleId);

    //Asking the moderator for confirmation of the article
    const confirmApproval = window.confirm("Are you sure you want to decline this article?");

    if (confirmApproval) {

      fetch(`${config.apiUrl}api/article/${articleId}`, {
        method: 'DELETE',
      })

        //if an error is returned
        .then((response) => {
          console.log('Response status:', response.status);
          if (!response.ok) {
            console.error('Network response was not ok');
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          console.log('Article successfully declined');

          //Deleting the article when the user clicks on the decline button
          setModeratedArticles(prevArticles => prevArticles.filter(article => article._id !== articleId));
        })
        .catch((error) => {
          console.error('Error declining article:', error);
          console.log("The id is ", articleId);
        });

    }
  };


  return (
    <div className="container">
      <h1>Moderator View Page</h1>
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
            <tr key={article._id} className={styles.row}>
              {headers.map((header) => (
                <td key={header.key}>{article[header.key]}</td>
              ))}
              <td>
                <button onClick={() => handleApprove(article._id)}>Approve</button>
                <button onClick={() => handleDecline(article._id)}>Decline</button>
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
    const response = await axios.get(`${config.apiUrl}api/article`);
    const articles: ArticlesInterface[] = response.data;
    //Calling only the articles can only been seen by moderator
    const approvedArticles = articles.filter(article => article.status === false);

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
