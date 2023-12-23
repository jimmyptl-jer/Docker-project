import React, { useEffect, useState } from 'react';
import axios from 'axios';

import BackButton from '../../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';

const EditProgram = () => {
  // State to store the current program data
  const [program, setProgram] = useState({
    name: '',
    location: '',
    annualElectricity: '',
    annualGasUsage: '',
    link: '',
    sector: '',
    description: '',
  });

  // State to handle loading status
  const [isLoading, setIsLoading] = useState(false);

  // React Router hook to enable navigation
  const navigate = useNavigate();

  // Extract the 'id' parameter from the URL using React Router
  const { id } = useParams();

  // Initialize state for input fields to hold updated program data
  const [input, setInput] = useState({
    name: '',
    location: '',
    annualElectricity: '',
    annualGasUsage: '',
    link: '',
    sector: '',
    description: '',
  });

  // Function to handle changes in the input fields
  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  // Function to send updated data to the server when the form is submitted
  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .put(`http://localhost:5001/program/${id}`, input)
      .then((response) => {
        setIsLoading(false);
        setProgram(input); // Update the 'program' state with the new data
        navigate(`/program`);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  // Fetch program data from the server and populate the input fields
  useEffect(() => {
    try {
      setIsLoading(true);

      axios
        .get(`http://localhost:5001/program/${id}`)
        .then((response) => {
          setInput({
            name: response.data.name,
            location: response.data.location,
            link: response.data.link,
            annualElectricity: response.data.annualElectricity,
            annualGasUsage: response.data.annualGasUsage,
            sector: response.data.sector,
            description: response.data.description,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error:', error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <div>
      <BackButton />

      <form onSubmit={handleSubmit}>
        <h2>Add New Program</h2>

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="name">Program Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Please enter the program name"
              value={input.name}
              onChange={(event) => {
                handleChange('name', event.target.value);
              }}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="sector">Sector</label>
            <input
              id="sector"
              type="text"
              name="sector"
              placeholder="Please enter the sector of program"
              value={input.sector}
              onChange={(event) => {
                handleChange('sector', event.target.value);
              }}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="link">Link</label>
            <input
              id="link"
              type="url"
              name="link"
              placeholder="Please enter the link to program"
              value={input.link}
              onChange={(event) => {
                handleChange('link', event.target.value);
              }}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="location">Locations</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Please enter the location which is available"
              value={input.location}
              onChange={(event) => {
                handleChange('location', event.target.value);
              }}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="annualElectricity">Annual Electricity Usage</label>
            <input
              id="annualElectricity"
              type="number"
              name="annualElectricity"
              placeholder="Please enter the annual electricity usage range"
              value={input.annualElectricity}
              onChange={(event) => {
                handleChange('annualElectricity', event.target.value);
              }}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="annualGasUsage">Annual Gas Usage</label>
            <input
              id="annualGasUsage"
              type="number"
              name="annualGasUsage"
              placeholder="Please enter the annual gas usage range"
              value={input.annualGasUsage}
              onChange={(event) => {
                handleChange('annualGasUsage', event.target.value);
              }}
            />
          </div>

          <div className="control no-margin">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Please enter the description of the program"
              value={input.description}
              onChange={(event) => {
                handleChange('description', event.target.value);
              }}
            />
          </div>
        </div>

        {/* {error && <p className="text-red-500">{error}</p>} */}

        <p className="form-actions">
          <button className="button">Submit</button>
        </p>
      </form>
    </div>
  );
};

export default EditProgram;
