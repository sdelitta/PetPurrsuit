import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../globals";

const OrganizationSearch = (props) => {
    const [search, setSearch] = useState('');
    const [filteredOrganizations, setFilteredOrganizations] = useState(props.organizations);
  
    const handleSearchChange = (event) => {
      setSearch(event.target.value);
      setFilteredOrganizations(props.organizations.filter(organization => 
        organization.name.toLowerCase().includes(search.toLowerCase())
        || organization.address.state.toLowerCase().includes(search.toLowerCase())
        || organization.address.city.toLowerCase().includes(search.toLowerCase())
      ));
    }
    if (!props.organizations) {
        return <div></div>
    } 
    
    return (
        <div className="state-content">
            {/* {props.organizations.map((organization) => (
                <div key={organization.id} className="state-title">
                    <h3>{organization.name}</h3>
                    <button>View Organization</button>
                </div>
            ))} */}
        
            <label>
                Search:
                <input type="text" value={search} onChange={handleSearchChange} placeholder="Search by state, city or organization name" />
            </label>
            {filteredOrganizations.map((organization, index) => (
                <div key={index} className="state-title">
                    <h3>{organization.name}</h3>
                    <Link to={`/organization/${organization.id}`}>
                        <button>View Organization</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default OrganizationSearch


