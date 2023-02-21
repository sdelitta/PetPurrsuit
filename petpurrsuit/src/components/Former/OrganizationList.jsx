import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../globals";

const OrganizationList = (props) => {
  const token = props.token
  const [organizations, setOrganizations] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  useEffect(() => {
      async function fetchData() {
        const res = await axios.get(`${BASE_URL}/organizations?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHasMore(res.data.has_more)
        setOrganizations(prevOrganizations => prevOrganizations.concat(res.data.organizations))
        setPage(page + 1)
        // console.log(res.data.has_more)
        console.log(res)
      }
      if (token) {
        if (hasMore) {
          fetchData()
        }
      } 
    }, [token, page, hasMore])
  
  return (
      <div className="organization-content">
          {organizations.map((organization) => (
              <div key={organization.id} className="state-title">
                  <h3>{organization.name}</h3>
                  <button>View Organization</button>
              </div>
          ))}
      
          
      </div>
  )
}

export default OrganizationList


