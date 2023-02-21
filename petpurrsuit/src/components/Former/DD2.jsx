import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../globals";

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

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [types, setTypes] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [genders, setGenders] = useState([]);
    const [ages, setAges] = useState([]);
    const [colors, setColors] = useState([]);
    const [colorsArray, setColorsArray] = useState([]);
    
    const fetchOrganizations = useCallback(async (token) => {
        try {
        const res = await axios.get(`${BASE_URL}/organizations`, {
            headers: {
            'Authorization': `Bearer ${ token }`
            },
            params: {
                state: filters.state !== 'all' ? filters.state : undefined,
                city: filters.city !== 'all' ? filters.city : undefined,
            }
        });

        setOrganizations(res.data.animals);
        const statesSet = new Set();
        const citiesSet = new Set();
        
        res.data.animals.forEach(organization => {
            statesSet.add(organization.state);
            citiesSet.add(organization.city);
        });

        setStates([...statesSet]);
        setCities([...citiesSet]);
        } catch (error) {
        console.error(error);
        }
    }, [filters.city, filters.state])
    
    
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
                color: filters.color !== 'all' ? filters.color : undefined
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
            if (Array.isArray(pet.colors)) {
            pet.colors.forEach(color => colorsSet.add(color.name));
            }
        });

        setStates([...statesSet]);
        setCities([...citiesSet]);
        setTypes([...typesSet]);
        setSizes([...sizesSet]);
        setGenders([...gendersSet]);
        setAges([...agesSet]);
        setColors([...colorsSet]);
        } catch (error) {
        console.error(error);
        }
    }, [filters.age, filters.color, filters.gender, filters.size, filters.type, filters.city, filters.state])

    // Function to handle filter changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    }

    useEffect(() => {
        if(token) {
            fetchOrganizations(token)
            fetchPets(token)
        // setPets(token)
        }
    }, [token, fetchOrganizations, fetchPets]);
    
    useEffect(() => {
        if(token) {
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
            
            setStates([...statesSet]);
            setCities([...citiesSet]);
            setTypes([...typesSet]);
            setSizes([...sizesSet]);
            setGenders([...gendersSet]);
            setAges([...agesSet]);
            setColors([...colorsSet]);
        }
    },[organizations, pets, token]);


    useEffect(() => {
        // logic to fetch data
        setColorsArray(colors);
    }, [colors]);

    useToken()
    console.log(pets);

    return (
        token ? (
        <div className="App">
        <h1>Pet Finder</h1>
        <div>
            <form>
                <label>
                    State:
                    <select name="state" value={filters.state} onChange={e => handleFilterChange(e)}>
                    <option value="all">All</option>
                    {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                    ))}
                    </select>
                </label>
                <label>
                    City:
                    <select name="city" value={filters.city} onChange={e => handleFilterChange(e)}>
                    <option value="all">All</option>
                    {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
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
        <div>
            {organizations.map(organization => (
                <div key={organization.id}>
                    <h2>{organization.name || 'Unnamed'}</h2>
                    {/* <img src={organization.primary_photo_cropped.full} alt={organization.name} /> */}
                    <p>State: {organization.state}</p>
                    <p>City: {organization.city}</p>
                </div>
            ))}
            {pets.map(pet => (
            <div key={pet.id}>
                <h2>{pet.name || 'Unnamed'}</h2>
                {/* <img src={pet.primary_photo_cropped.full} alt={pet.name} /> */}
                <p>State: {pet.state}</p>
                <p>City: {pet.city}</p>
                <p>Type: {pet.type}</p>
                <p>Size: {pet.size}</p>
                <p>Gender: {pet.gender}</p>
                <p>Age: {pet.age}</p>
                <p>Colors: {colorsArray.map(color => color)}</p>
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