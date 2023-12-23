import React, { useState } from 'react';
import axios from 'axios';

import BackButton from '../../components/BackButton';
import { useNavigate } from 'react-router-dom';

const CreateProgram = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    annualElectricity: '',
    annualGasUsage: '',
    link: '',
    sector: '',
    description: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      location: formData.location,
      annualElectricity: parseFloat(formData.annualElectricity),
      annualGasUsage: parseFloat(formData.annualGasUsage),
      link: formData.link,
      sector: formData.sector,
      description: formData.description,
    };

    axios
      .post('http://localhost:5001/program', data)
      .then((response) => {
        console.log(response);
        navigate('/program');
      })
      .catch((error) => {
        setError('Sorry, something went wrong. Please try again.');
        console.error(error);
      });
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <BackButton />

      <form onSubmit={handleSubmit}>
        <h2>Add New Program</h2>

        <div className="control">
          <label htmlFor="name">Program Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Please enter the program name"
            value={formData.name}
            onChange={(event) => {
              handleChange('name', event.target.value);
            }}
          />
        </div>

        <div className="control">
          <label htmlFor="sector">Sector</label>
          <input
            id="sector"
            type="text"
            name="sector"
            placeholder="Please enter the sector of program"
            value={formData.sector}
            onChange={(event) => {
              handleChange('sector', event.target.value);
            }}
          />
        </div>

        <div className="control">
          <label htmlFor="link">Link</label>
          <input
            id="link"
            type="url"
            name="link"
            placeholder="Please enter the link to program"
            value={formData.link}
            onChange={(event) => {
              handleChange('link', event.target.value);
            }}
          />
        </div>

        <div className="control">
          <label htmlFor="location">Locations</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Please enter the location which is available"
            value={formData.location}
            onChange={(event) => {
              handleChange('location', event.target.value);
            }}
          />
        </div>

        <div className="control">
          <label htmlFor="annualElectricity">Annual Electricity Usage</label>
          <input
            id="annualElectricity"
            type="number"
            name="annualElectricity"
            placeholder="Please enter the annual electricity usage range"
            value={formData.annualElectricity}
            onChange={(event) => {
              handleChange('annualElectricity', event.target.value);
            }}
          />
        </div>

        <div className="control">
          <label htmlFor="annualGasUsage">Annual Gas Usage</label>
          <input
            id="annualGasUsage"
            type="number"
            name="annualGasUsage"
            placeholder="Please enter the annual gas usage range"
            value={formData.annualGasUsage}
            onChange={(event) => {
              handleChange('annualGasUsage', event.target.value);
            }}
          />
        </div>

        <div className="control">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Please enter the description of the program"
            value={formData.description}
            onChange={(event) => {
              handleChange('description', event.target.value);
            }}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <p className="form-actions">
          <button className="button">Submit</button>
        </p>
      </form>
    </div>
  );
};

export default CreateProgram;
