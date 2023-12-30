import axios from 'axios'
const baseURL = 'https://akbarali.shop/'


const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    },

});
export default axiosInstance;
