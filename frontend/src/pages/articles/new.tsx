import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import axios from 'axios';

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

//     console.log('Title:', title);
// console.log('Authors:', authors);
// console.log('Source:', source);
// console.log('DOI:', doi);
// console.log('Summary:', summary);
// console.log('Linked Discussion:', linkedDiscussion);
    
    // if (!title || !authors.length || !source || !doi || !summary || !linkedDiscussion) {
    //  // console.error('Please fill in all required fields.');
    //  setErrorMessage('Please fill in all the required fields')
    //   return;
    // }
  

    // Create an object with the form data
    const formData = {
      title,
      authors,
      source,
      pubYear,
      doi,
      summary,
      linkedDiscussion,
    };
    try {
      // Send the form data to your backend API
      const response = await axios.post('http://localhost:8082/api/article', formData);

      console.log('Data sent successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  // Some helper methods for the authors array

  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };


  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  

return (
  <div className="container">
    <h1>New Article</h1>
    
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <form className={formStyles.form} onSubmit={submitNewArticle}>
      <label htmlFor="title">Title:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        placeholder="Enter the title"
      />

      <label htmlFor="author">Authors:</label>
      {authors.map((author, index) => {
        return (
          <div key={`author ${index}`} className={formStyles.arrayItem}>
            <input
              type="text"
              name="author"
              value={author}
              onChange={(event) => changeAuthor(index, event.target.value)}
              className={formStyles.formItem}
              placeholder={`Author ${index + 1}`}
            />
            <button
              onClick={() => removeAuthor(index)}
              className={formStyles.buttonItem}
              style={{ marginLeft: "3rem" }}
              type="button"
            >
              -
            </button>
          </div>
        );
      })}
      <button
        onClick={() => addAuthor()}
        className={formStyles.buttonItem}
        style={{ marginLeft: "auto" }}
        type="button"
      >
        +
      </button>

      <label htmlFor="source">Source:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="source"
        id="source"
        value={source}
        onChange={(event) => {
          setSource(event.target.value);
        }}
        placeholder="Enter the source"
      />

      <label htmlFor="pubYear">Publication Year:</label>
      <input
        className={formStyles.formItem}
        type="number"
        name="pubYear"
        id="pubYear"
        value={pubYear}
        onChange={(event) => {
          const val = event.target.value;
          if (val === "") {
            setPubYear(0);
          } else {
            setPubYear(parseInt(val));
          }
        }}
        placeholder="Enter the publication year"
      />

      <label htmlFor="doi">DOI:</label>
      <input
        className={formStyles.formItem}
        type="text"
        name="doi"
        id="doi"
        value={doi}
        onChange={(event) => {
          setDoi(event.target.value);
        }}
        placeholder="Enter the DOI"
      />

      <label htmlFor="summary">Summary:</label>
      <textarea
        className={formStyles.formTextArea}
        name="summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
        placeholder="Enter the summary"
      />

      <button className={formStyles.formItem} type="submit">
        Submit
      </button>
    </form>
  </div>
);
      }

export default NewDiscussion;
