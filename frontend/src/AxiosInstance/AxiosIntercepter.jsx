import axios from 'axios'
const baseURL = 'http://16.171.139.168/'


const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    },

});
export default axiosInstance;
