import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { BASE_URL } from "../globals";

const useToken = () => {
    const [token, setToken] = useState('')
  
    useEffect(() => {
      const fetchToken = async () => {
        const data = {
          grant_type: 'client_credentials',
          client_id: 'LRoTpzqY9jsdlxb3076H4ptXpjdyEKDkunLACNP7pxCznAMYb2',
          client_secret: 'dMSfOTIDmmGxQksfGEKkn3wk0XfXanFpw2PMQ7Lg'
        }
  
        try {
          const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', data)
          setToken(response.data.access_token)
        } catch (error) {
          console.error(error)
        }
      }
      fetchToken()
    }, [])
    return token
}

const DropDown = () => {
    const token = useToken()
    const [organizations, setOrganizations] = useState([])
    const [pets, setPets] = useState([])
    const [filters, setFilters] = useState({
        state: 'all',
        city: 'all',
        type: 'all',
        size: 'all',
        gender: 'all',
        age: 'all',
        color: 'all'
    });

    // const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [types, setTypes] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [genders, setGenders] = useState([]);
    const [ages, setAges] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedStateIndex, setSelectedStateIndex] = useState(0);
    const [selectedCityIndex, setSelectedCityIndex] = useState(0);


    const states = useMemo(() => [
        "All", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
      ], [])
      
    
      const fetchAnimalsByZipCode = useCallback(async (token, zipCode) => {
        try {
        const res = await axios.get(`${BASE_URL}/animals`, {
        headers: {
        'Authorization': `Bearer ${token}`,
        },
        params: {
        location: zipCode,
        },
        });
        const { data } = res;
        // handle the returned data as needed
        } catch (error) {
        console.error(error);
        }
        }, []);
    
    
    
    
      const fetchOrganizations = useCallback(async (token) => {
        try {
        const res = await axios.get(`${BASE_URL}/organizations`, {
            headers: {
            'Authorization': `Bearer ${ token }`
            },
            params: {
                state: states[selectedStateIndex] !== "All" && states[selectedStateIndex],
                city: cities[selectedCityIndex] !== "All" && cities[selectedCityIndex],
            }
        });

        setOrganizations(res.data.organizations);
        const statesSet = new Set();
        const citiesSet = new Set();
        
        res.data.organizations.forEach(organization => {
            statesSet.add(organization.address.state);
            citiesSet.add(organization.address.city);
        });

        setSelectedStateIndex()
        setSelectedCityIndex()
        } catch (error) {
        console.error(error);
        }
    }, [selectedStateIndex, selectedCityIndex, cities, states])
    

    const fetchPets = useCallback(async (token) => {
        try {
        const res = await axios.get(`${BASE_URL}/animals`, {
            headers: {
            'Authorization': `Bearer ${ token }`
            },
            params: {
                state: filters.state !== 'all' ? filters.state : undefined,
                city: filters.city !== 'all' ? filters.city : undefined,
                type: filters.type !== 'all' ? filters.type : undefined,
                size: filters.size !== 'all' ? filters.size : undefined,
                gender: filters.gender !== 'all' ? filters.gender : undefined,
                age: filters.age !== 'all' ? filters.age : undefined,
                colors: filters.colors !== 'all' ? filters.colors : undefined
            }
        });
        setPets(res.data.animals);
        const statesSet = new Set();
        const citiesSet = new Set();
        const typesSet = new Set();
        const sizesSet = new Set();
        const gendersSet = new Set();
        const agesSet = new Set();
        const colorsSet = new Set();

        res.data.animals.forEach(pet => {
            statesSet.add(pet.state);
            citiesSet.add(pet.city);
            typesSet.add(pet.type);
            sizesSet.add(pet.size);
            gendersSet.add(pet.gender);
            agesSet.add(pet.age);
            colorsSet.add(pet.colors.primary, pet.colors.secondary, pet.colors.tertiary);
        });

        // setStates([...statesSet]);
        setCities([...citiesSet]);
        setTypes([...typesSet]);
        setSizes([...sizesSet]);
        setGenders([...gendersSet]);
        setAges([...agesSet]);
        setColors([...colorsSet]);
        } catch (error) {
        console.error(error);
        }
    }, [filters.age, filters.colors, filters.gender, filters.size, filters.type, filters.city, filters.state])

    // Function to handle filter changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        console.log(organizations);
    }

    useEffect(() => {
        if(token && selectedStateIndex) {
            fetchOrganizations(token)
            // fetchPets(token)
            // setPets(token)
        }
    }, [token, organizations, pets, selectedStateIndex, fetchOrganizations, fetchPets]);
    
    useEffect(() => {
        if(token && fetchPets) {
            const statesSet = new Set();
            const citiesSet = new Set();
            const typesSet = new Set();
            const sizesSet = new Set();
            const gendersSet = new Set();
            const agesSet = new Set();
            const colorsSet = new Set();
            organizations.forEach(organization => {
                statesSet.add(organization.state);
                citiesSet.add(organization.city);
            })
            pets.forEach(pet => {
                typesSet.add(pet.type);
                sizesSet.add(pet.size);
                gendersSet.add(pet.gender);
                agesSet.add(pet.age);
                // pet.colors.forEach(color => colorsSet.add(color.name));
            });
            
            // setStates([...statesSet]);
            setCities([...citiesSet]);
            setTypes([...typesSet]);
            setSizes([...sizesSet]);
            setGenders([...gendersSet]);
            setAges([...agesSet]);
            setColors([...colorsSet]);
        }
    },[organizations, pets, token, fetchPets]);


    useToken()
    // console.log(pets);

    return (
        token ? (
        <div className="App">
            <h1>Pet Finder</h1>
            <div className="dropdowns">
                <form>
                    <label>
                        State:
                        <select onChange={(e) => setSelectedStateIndex(e.target.value)}>
                            {states.map((state, index) => (
                                <option key={index} value={index}>{state}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        City:
                        <select name="city" value={filters.city} onChange={e => { handleFilterChange(e);
                        setSelectedCityIndex(e.target.value);}}>
                        <option value="all">All</option>
                        {organizations.map(organization => (
                        <option key={organization.id} value={organization.address.city}>
                        {organization.address.city}
                        </option>
                        ))}
                        </select>
                    </label>
                    <label>
                        Type:
                        <select name="type" value={filters.type} onChange={e => handleFilterChange(e)}>
                        <option value="all">All</option>
                        {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                        ))}
                        </select>
                    </label>
                    <label>
                        Size:
                        <select name="size" value={filters.size} onChange={e => handleFilterChange(e)}>
                        <option value="all">All</option>
                        {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                        ))}
                        </select>
                    </label>
                    <label>
                        Gender:
                        <select name="gender" value={filters.gender} onChange={e => handleFilterChange(e)}>
                        <option value="all">All</option>
                        {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                        ))}
                        </select>
                    </label>
                    <label>
                        Age:
                        <select name="age" value={filters.age} onChange={e => handleFilterChange(e)}>
                        <option value="all">All</option>
                        {ages.map(age => (
                        <option key={age} value={age}>{age}</option>
                        ))}
                        </select>
                    </label>
                    <label>
                        Color:
                        <select name="color" value={filters.color} onChange={e => handleFilterChange(e)}>
                        <option value="all">All</option>
                        {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                        ))}
                        </select>
                    </label>
                    <button type="button" onClick={fetchPets}>Search</button>
                </form>
            </div>
            {selectedCityIndex ? (
                <div>
                    {organizations.map(organization => (
                        <div key={organization.id}>
                            <h2>{organization.name || 'Unnamed'}</h2>
                            {/* <img src={organization.primary_photo_cropped.full} alt={organization.name} /> */}
                            <p>State: {organization.address.state}</p>
                            <p>City: {organization.address.city}</p>
                        </div>
                    ))}
                </div> 
            ): 
                <div></div>
            }

            <div>
                {pets.map(pet => (
                    <div key={pet.id}>
                        <h2>{pet.name || 'Unnamed'}</h2>
                        {/* <img src={pet.primary_photo_cropped.full} alt={pet.name} /> */}
                        {/* <p>State: {pet.state}</p>
                        <p>City: {pet.city}</p> */}
                        <p>Type: {pet.type}</p>
                        <p>Size: {pet.size}</p>
                        <p>Gender: {pet.gender}</p>
                        <p>Age: {pet.age}</p>
                        <p>Colors: {pet.colors.primary}{pet.colors.secondary}{pet.colors.tertiary}</p>
                        <p>{pet.description}</p>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div>Loading...</div>
    )
)}

export default DropDown