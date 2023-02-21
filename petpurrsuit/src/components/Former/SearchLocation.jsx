import { React, useState } from 'react'
import axios from 'axios'
import OrganizationList from './OrganizationList'

function SearchLocation(props) {
    const {organizations} = props
    const [fName, setName] = useState("")
    const [fMembers, setMembers] = useState("")
    const [fAlbums, setAlbums] = useState("")
    const [fPicture, setPicture] = useState("")
    const [fId, setId] = useState("")
    const [isAdd, setAdd] = useState(true)

    const getDetails = () => {
    return {
            organizationName: fName,
            members: fMembers,
            albums: fAlbums,
            picture: fPicture
        }
    }
    const loadOrganization = (e) => {
        const value = e.target.value
        const organization = organizations.find((organization)=> { return organization.organizationName === value })
        setName(organization.organizationName)
        setMembers(organization.members)
        setAlbums(organization.albums.join(", "))
        setPicture(organization.picture)
        setId(organization._id)
        console.log("this is a test", organization)
    }

    const sendToAPI = async (e) => {
        e.preventDefault()  
        const details = getDetails()        
        if (isAdd) {
            await axios.post(`http://127.0.0.1:3001/api/organizations/create`, details)
        } else {
            await axios.put(`http://127.0.0.1:3001/api/organizations/${fId}`, details)
        }
        window.location.reload()
    }

    return ( 
        <div className='customize-db'>
            <h2>
                {isAdd ? "Add" : <button onClick={() => {setAdd(true)}}>Add</button>}
                {" "}
                or
                {" "} 
                {!isAdd ? "Customize" : <button onClick={() => {setAdd(false)}}>Customize</button>} 
                {" "}
                Organizations Here!
            </h2>
            <form id="add-form" onSubmit= {sendToAPI}>
                <div className="custom-title"></div>
                <div className="form-group">
                    <span></span>
                    {isAdd 
                        ? <input name="name" placeholder="Organization Name" className="form-control"  type="text" value={fName} onChange={(e) => setName(e.target.value)}/>
                        : <select onChange={(e)=> {loadOrganization(e)}}>
                            <option value="">--Select Organization--</option>
                            {organizations.map((organization) => (
                                <option value={organization.organizationName} key={organization.organizationName}>{organization.organizationName}</option>
                            ))} 
                        </select>}
                    <input name="organizationName" type="text" className="form-control" placeholder="Add Organization Name" value={fName} onChange={(e) => setName(e.target.value)} />
                    <input name="members" type="text" className="form-control" placeholder="Band Members" value={fMembers} onChange={(e) => setMembers(e.target.value)} />
                    <input name="albums" type="text" className="form-control" placeholder="Albums" value={fAlbums} onChange={(e) => setAlbums(e.target.value)} />
                    <input name="picture" type="text" className="form-control" placeholder="Photo URL" value={fPicture} onChange={(e) => setPicture(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SearchLocation