import React from 'react';
import { useParams } from 'react-router-dom';

const OrganizationDetail = (props) => {
    const { id } = useParams()
    const { organization } = props;
    return (
        <div className="organization-detail">
            <h2>{organization.name}</h2>
            <p>Address: {organization.address.address1}, {organization.address.city}, {organization.address.state} {organization.address.postcode}</p>
            <p>Phone: {organization.phone}</p>
            <p>Email: {organization.email}</p>
            <p>Website: <a href={organization.website}>{organization.website}</a></p>
            <h3>Animals:</h3>
            <ul>
                {organization.animals.map(animal => (
                    <li key={animal.id}>{animal.name} ({animal.species})</li>
                ))}
            </ul>
        </div>
    )
}

export default OrganizationDetail;
