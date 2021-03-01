import router from './../router/index';
const baseUrl = 'http://localhost:4000';

function getHeaders() {
    const headers = new Headers();
    const token = localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
}

function checkAuth(res) {
    if (res.status === 401) {
        router.push('/login');
    }

    return res.json();
}

const postJson = function(options) {
    const headers = getHeaders();

    return fetch(`${baseUrl}${options.url}`, {
        method: 'post',
        headers,
        body: JSON.stringify(options.data)
    }).then(checkAuth);
}

const getJson = function(options) {
    const headers = getHeaders();

    return fetch(`${baseUrl}${options.url}`, {
        method: 'get',
        headers
    }).then(checkAuth);
}


export  {
    postJson,
    getJson
};