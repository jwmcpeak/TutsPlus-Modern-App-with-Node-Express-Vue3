const baseUrl = 'http://localhost:4000';

const postJson = function(options) {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return fetch(`${baseUrl}${options.url}`, {
        method: 'post',
        headers,
        body: JSON.stringify(options.data)
    }).then(res => res.json()).then(obj => {
        if (obj.token) {
            localStorage.setItem('auth-token', obj.token);
        }

        return obj;
    });
}


module.exports = {
    postJson
};