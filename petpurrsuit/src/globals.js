import axios from "axios"
import REACT_APP_PP_TOKEN from "./.env"

export const BASE_URL = 'https://api.petfinder.com/v2'
export const ORG_PATH = 'https://organizations'

// const axiosRequest = axios.create({
//     baseURL: 'https://api.petfinder.com/v2/',
//     timeout: 5000,
//     headers: {
//         "Authorization": `Bearer ${REACT_APP_PP_TOKEN}`,
//     }    
// })

// export default axiosRequest