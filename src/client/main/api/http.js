import axios from 'axios';

const headers = {
    'Content-type': 'application/json'
}

const callback = (fn) => {
    return (res) => {
        try {
            if (typeof fn === 'function') {
                const data = res.data;
                if (!data.hasError) {
                    fn(data);
                } else if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    console.error(data.message);
                    fn(data)
                }
            } else {
                console.log(`${fn} is not a function`);
            }
        } catch (e) { console.log(e) }
    };
}

export default {
    get: (url, onSuccess, onError, params = {}) => {
        axios.get(url, { params, headers })
            .then(callback(onSuccess))
            .catch(callback(onError));
    },
    post: (url, onSuccess, onError, body = {}, params = {}) => {
        axios.post(url, body, { params, headers })
            .then(callback(onSuccess))
            .catch(callback(onError));
    },
    put: (url, onSuccess, onError, body = {}, params = {}) => {
        axios.put(url, { body, params, headers })
            .then(callback(onSuccess))
            .catch(callback(onError));
    },
    delete: (url, onSuccess, onError, body = {}, params = {}) => {
        axios.delete(url, { body, params, headers })
            .then(callback(onSuccess))
            .catch(callback(onError));
    }
}