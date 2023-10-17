import axios from "axios";

export function getCredits() {
    return axios.get('http://localhost:3000/getCredits')
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}

export function getCaptures() {
    return axios.get('http://localhost:3000/getCaptures')
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}

export function creatCapture(title) {
    return axios.post('http://localhost:3000/creatCapture', {title})
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}

export function uploadCapture(form) {
    return axios.put('http://localhost:3000/uploadCapture', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}

export function triggerCapture(slug) {
    return axios.get('http://localhost:3000/triggerCapture',{
        params: {
            slug
        }
    })
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}

export function getACapture(slug) {
    return axios.get('http://localhost:3000/getACapture',{
        params: {
            slug
        }
    })
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}

export function test() {
    return axios.get('http://localhost:3000/getCaptures')
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => console.log('error', error));
}
