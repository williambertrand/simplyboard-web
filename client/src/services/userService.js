import { config } from '../config';
import { authHeader } from '../helpers/AuthHeader';
import Cookies from 'js-cookie'


function clearCookies() {
    localStorage.clear();
    Cookies.remove('slb-token');
    console.log('cleared token: ' + Cookies.get('slb-token'));
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(res => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('slb-user', JSON.stringify(res.user));
            Cookies.set('slb-token', res.token);
            return res.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    clearCookies()    
    localStorage.removeItem('slb-user');
    Cookies.remove('slb-token');
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('slb-user', JSON.stringify(res.user));
            Cookies.set('slb-token', res.token);
            return res.user;
        });
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export const userService = {
    login,
    logout,
    register,
    getById,
    update,
    delete: _delete
};