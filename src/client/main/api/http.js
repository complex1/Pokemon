import axios from 'axios';

const headers = {
    'Content-type': 'application/json'
  }

const callback = (fn) => {
    return (...args) => {
        fn && fn(...args);
    };
}

export default {
    get: (url, onSuccess, onError, params = {}) => {
        axios.get(url, {params, headers})
            .then(callback(onSuccess))
            .catch(callback(onError));
    },
    post: (url, onSuccess, onError, body = {}, params = {}) => {
        axios.post(url, {body, params, headers})
            .then(callback(onSuccess))
            .catch(callback(onError));
    },
    put: (url, onSuccess, onError, body = {}, params = {}) => {
        axios.put(url, {body, params, headers})
            .then(callback(onSuccess))
            .catch(callback(onError));
    },
    delete: (url, onSuccess, onError, params = {}) => {
        axios.delete(url, {params, headers})
            .then(callback(onSuccess))
            .catch(callback(onError));
    }
}