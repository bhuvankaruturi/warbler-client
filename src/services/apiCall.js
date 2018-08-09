import axios from 'axios';


export const setAuthorizationHeaders = function(token) {
    if(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

const apiCall = function(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.error));
    });
};

export default apiCall;