// import { GetStaticProps, NextPage } from "next";
// import SortableTable from "../../components/table/SortableTable";
// import data from "../../utils/dummydata.json";
// import axios from 'axios';

// interface ArticlesInterface {
//   id: string;
//   title: string;
//   authors: string;
//   source: string;
//   pubyear: string;
//   doi: string;
//   claim: string;
//   evidence: string;
// }

// type ArticlesProps = {
//   articles: ArticlesInterface[];
// };

// const Articles: NextPage<ArticlesProps> = ({ articles }) => {
//   const headers: { key: keyof ArticlesInterface; label: string }[] = [
//     { key: "title", label: "Title" },
//     { key: "authors", label: "Authors" },
//     { key: "source", label: "Source" },
//     { key: "pubyear", label: "Publication Year" },
//     { key: "doi", label: "DOI" },
//     { key: "claim", label: "Claim" },
//     { key: "evidence", label: "Evidence" },
//   ];

//   return (
//     <div className="container">
//       <h1>Articles Index Page</h1>
//       <p>Page containing a table of articles:</p>
//       <SortableTable headers={headers} data={articles} />
//     </div>
//   );
// };

// export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
//   // Map the data to ensure all articles have consistent property names
//   const articles = data.articles.map((article) => ({
//     id: article.id ?? article._id,
//     title: article.title,
//     authors: article.authors,
//     source: article.source,
//     pubyear: article.pubyear,
//     doi: article.doi,
//     claim: article.claim,
//     evidence: article.evidence,
//   }));

//   return {
//     props: {
//       articles,
//     },
//   };
// };

// export default Articles;

import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import axios from 'axios';

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
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <SortableTable headers={headers} data={articles} />
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
