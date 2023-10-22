import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import axios from 'axios';
import { useEffect } from "react";

//Submit New 
const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State for success message

  // Function to join the authors array into a single string
  const authorsString = authors.join(", ");

  // This function handles the form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    //|| !source || !doi || !summary || !linkedDiscussion
    if (!title || authors.length === 0) {
      //setErrorMessage('Please enter the title of the article and author name');
      window.alert("Please enter the title of the article and author name")
      return;
    }

    // Create an object with the form data
    const formData = {
      title,
      authors: authorsString, // Send the authors as a string
      source,
      pubYear,
      doi,
      claim,
      evidence,
      summary,
      linkedDiscussion,
    };

    try {
      setIsSubmitting(true);

      //console.log("Button text set to 'Submitting...'"); // Add this line

      setTimeout(async () => {
        // Send the form data to your backend API
        const response = await axios.post('http://localhost:8082/api/article', formData);


        // console.log('Data sent successfully:', response.data);

        // const response = await axios.post('http://localhost:8082/api/article?moderator=true', formData);

        console.log('Data sent successfully to moderator view:', response.data);

        // After successful submission, set "Submitted"
        setIsSuccess(true);
        // console.log("Set isSuccess to true"); // Add this line

        // Reset back to "Submit" after 1 second
        setTimeout(() => {
          setIsSubmitting(false);
          setTitle("");
          setAuthors([]);
          setSource("");
          setPubYear(0);
          setDoi("");
          setClaim("");
          setEvidence("");


          //setSummary("");
          // setLinkedDiscussion("");

          // Reload the page after 1 second
          setTimeout(() => {

            window.alert("Article submitted for review")
            window.location.reload();

          }, 200);
        }, 500);
      }, 200);
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

  // Function to reset the success message
  const resetSuccessMessage = () => {
    setIsSuccess(false);
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

        <label htmlFor="Claim">Claim:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="claim"
          id="Claim"
          value={claim}
          onChange={(event) => {
            setClaim(event.target.value);
          }}
          placeholder="Enter the Claim"
        />

        <label htmlFor="Evidence">Evidence:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="evidence"
          id="Evidence"
          value={evidence}
          onChange={(event) => {
            setEvidence(event.target.value);
          }}
          placeholder="Enter the Evidence"
        />

        {/*
        <label htmlFor="summary">Summary:</label>
        <textarea
          className={formStyles.formTextArea}
          name="summary"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="Enter the summary"
        />
        */}

        <button
          className={`${formStyles.formItem} ${isSubmitting ? formStyles.animatePulse : ""
            }`}
          type="submit"
          disabled={isSubmitting} // Disable the button while submitting
          onClick={resetSuccessMessage} //This line will reset the success message
        >
          {isSubmitting ? "Submitting..." : isSuccess ? "Submitted" : "Submit"}
        </button>

      </form>
    </div>
  );
};

export default NewDiscussion;
