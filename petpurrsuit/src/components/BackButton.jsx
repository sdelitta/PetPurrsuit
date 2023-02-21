import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimalList from './AnimalList';

const BackButton = ({ animals }) => {
  const navigate = useNavigate();
  console.log("BackButton animals: ", animals)



  return (
    <div>
      <button onClick={() => 
        navigate(`/`, 
        { state: {animals}})  
      }>Back</button>
      
    </div>
  );
}
export default BackButton