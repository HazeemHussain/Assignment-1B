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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to join the authors array into a single string
  const authorsString = authors.join(", ");

  // This function handles the form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Start the animation
    setIsSubmitting(true);

    // Simulate form submission (replace with your actual form submission logic)
    setTimeout(() => {
      // Stop the animation after a delay (you can adjust the delay as needed)
      setIsSubmitting(false);

      // Add your form submission logic here (e.g., axios.post)
    }, 1000); // Adjust the delay as needed

    if (!title || authors.length === 0 || !source || !doi || !summary || !linkedDiscussion) {
      setErrorMessage('Please fill in all the required fields');
    }

    // Create an object with the form data
    const formData = {
      title,
      authors: authorsString, // Send the authors as a string
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
  // Function to add an author to the list
  const addAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const removeAuthor = (index: number) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  const changeAuthor = (index: number, value: string) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };

  
  return (
    <div className="container">
      <h1>New Article</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className={formStyles.form} onSubmit={handleSubmit}>
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
        {authors.map((author, index) => (
          <div key={`author-${index}`} className={formStyles.arrayItem}>
            <input
              type="text"
              name={`author-${index}`}
              value={author}
              onChange={(event) => changeAuthor(index, event.target.value)}
              className={formStyles.formItem}
              placeholder={`Author ${index + 1}`}
            />
            <button
              onClick={() => removeAuthor(index)}
              className={formStyles.buttonItem}
              type="button"
            >
              -
            </button>
          </div>
        ))}
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

        <button
          className={`${formStyles.formItem} ${
            isSubmitting ? formStyles.animatePulse : ""
          }`}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
