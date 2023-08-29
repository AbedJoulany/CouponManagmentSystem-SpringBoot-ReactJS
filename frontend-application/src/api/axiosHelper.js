import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-type"] = 'application/json'


export const getAuthToken = () => {
    return sessionStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
    sessionStorage.setItem("auth_token",token);
};

export const request = (method,url,data,) =>{
    let headers = {};

    if(getAuthToken() !== null && getAuthToken()!=="null")
    {
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
    }
    return axios({
        method:method,
        headers:headers,
        url:url,
        data:data,
        });
}

/*export const request = (method, url, data) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const requestOptions = {
        method: method,
        headers: headers,
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.error('Request error:', error);
            throw error;
        });
};*/
