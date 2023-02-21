/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AnimalList from './AnimalList';
import BackButton from './BackButton';
import '../CSS/AnimalDetails.css'

const AnimalDetails = ({ animal, animals }) => {
  console.log("Here is the animal", animal)
  console.log("Here are the animals", animals)

  const useToken = () => {
    const [token, setToken] = useState("");
  
    useEffect(() => {
      const fetchToken = async () => {
        const data = {
          grant_type: "client_credentials",
          client_id: "LRoTpzqY9jsdlxb3076H4ptXpjdyEKDkunLACNP7pxCznAMYb2",
          client_secret: "dMSfOTIDmmGxQksfGEKkn3wk0XfXanFpw2PMQ7Lg"
        };
  
        try {
          const response = await axios.post(
            "https://api.petfinder.com/v2/oauth2/token",
            data
          );
          setToken(response.data.access_token);
        } catch (error) {
          console.error(error);
        }
      };
      fetchToken();
    }, []);
    return token;
  };

  const token = useToken();
  const [organization, setOrganization] = useState({});
  
  const fetchOrganization = useCallback(async () => {
    console.log(animal.organization_id)

    const res = await axios.get(`https://api.petfinder.com/v2/organizations/${animal.organization_id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  
    setOrganization(res.data.organization);
    console.log("Here is the SHELTER:", res.data)
    return organization
  }, [organization, animal, token]);

  useEffect(() => {
    if (animal.organization_id && token) {
      fetchOrganization();
    }
  }, [token]);


  const filteredDescription = animal.description.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  
  if (!animal) {
    return <p>Loading...</p> 
  } else {
    
    return (
      <div className="details">
        <BackButton animals={animals} />
        <div className="details_card">
          <img className="details_img" 
            src={
              !animal.primary_photo_cropped ? "No Image Available" 
              : animal.primary_photo_cropped.full
            }
            alt="Missing Photo"
          />
          <div className="details_info">
            <p className="name">{animal.name}</p>
            <p>{animal.age} | {animal.gender} | {animal.size} | {animal.breeds.primary}</p>
            <span style={{height:"6px"}}></span>
            <div className="description" >{filteredDescription}</div>
            <p>Where to adopt: {organization.website ? <span><a href={organization.website} target="_blank" rel="noospanener noreferrer">{organization.name}</a></span> : <span>{organization.name} (No Website Available)</span>} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AnimalDetails;