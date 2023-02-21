import React from 'react';

const About = () => {
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <h1 style={{textDecoration:"underline", color:"#3F0467"}}>About</h1>
        <div style={{display:"flex", flexDirection:"column", fontSize: "3vh", color: "orange", maxWidth: "70vw"}}>
            <p style={{fontSize:"2.5vh"}}>PetPurrsuit provides users with a comprehensive way to search for animals available for adoption within a 30 mile radius of a given location. Using data from local animal shelters and rescues, users can browse through lists of adoptable pets and view details on each individual animal, including breed, age, gender, and their adoption location.</p>
            <p style={{fontSize:"2.5vh"}}>PetPurrsuit was created by Steven DeLitta, a developer who is passionate about animal care and wanted to make a simple and intuitive interface to help you find the perfect pet for you and your family.</p>
            <p style={{fontSize:"2.5vh"}}>Whether you're a first-time pet owner or a seasoned animal lover, PetPurrsuit is here to help you every step of the way. So why wait? Start browsing and find your new best friend today!</p>
        </div>
        <space style={{height:"13vh"}}></space>
    </div>
  );
};

export default About;
