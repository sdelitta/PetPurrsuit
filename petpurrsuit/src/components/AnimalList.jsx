/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AnimalList.css"

const AnimalList = ({animals}) => {
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [animalsProps, setAnimalsProps] = useState(animals)
    const navigate = useNavigate()
    console.log("Here are the animals", animalsProps)
    
    if (animals){
        return(
            <div className="animal_list">
                {animals.map(animal => (
                    <div key={animal.id} className="animal_card">
                        <div>
                            <img className="animal_img" 
                                src={
                                    !animal.primary_photo_cropped ? "No Image Available" 
                                    : animal.primary_photo_cropped.full
                                }
                                alt="Missing Photo"
                            />
                            <div className="animal_info">
                                <p className="name">{animal.name || "No Name"}</p>
                                <p>{animal.age} | {animal.gender}</p>
                                <p>{animal.breeds.primary}</p>
                            </div>
                            <button className="animal_button"
                                onClick={() => {
                                    setSelectedAnimal(animal);
                                    console.log("Selected animal:",selectedAnimal);
                                    navigate(`/animal-details/${animal.id}`, 
                                    { state: {animal, animalsProps} })
                                    
                                }}
                                >Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default AnimalList