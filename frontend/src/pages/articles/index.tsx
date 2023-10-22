import { GetStaticProps, NextPage } from "next";
import React from "react";
import SortableTable from "../../components/table/SortableTable";
import axios from 'axios';
import styles from "styles/Articles.module.scss"; // Import the CSS module

interface ArticlesProps {
  articles: ArticlesInterface[];
}

//it define the structure of an article. it specifies the properties of the articles'
//should have. Eg id: what is expected to be a string
interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubYear: string;
  doi: string;
  claim: string;
  evidence: string;
  summary: string;
  analystStatus: boolean;
}


//Headers is an array of objects that defines the header of the table. Each
//header has 2 properties. Key defines the articles interface and the label defines
// the label the heading that it will display on the website
const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubYear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "summary", label: "Summary" },

  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <table className={styles.table}> {/* Apply the CSS class */}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className={styles.row}> {/* Apply row style */}
              {headers.map((header) => (
                <td key={header.key}>{article[header.key]}</td>
              ))}
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
    //const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/article`); // Replace with your actual API endpoint
    //const response = await axios.get('http://localhost:8082/api/article');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/article`);
    const articles: ArticlesInterface[] = response.data;
    const approvedArticles = articles.filter(article => article.analystStatus === true);

    return {
      props: {
        articles: approvedArticles, // Use approvedArticles here instead of articles
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

