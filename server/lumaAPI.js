import axios from 'axios'
import * as fs from "fs";

const API_KEY = '905c3d31-ed50-4b7c-a8ac-2bfbfba709ba-47459af-bf3c-48a7-9427-c6c91bedf359'

const commonHeaders = {
    'Authorization': 'luma-api-key=' + API_KEY
}


export function getCredits() {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://webapp.engineeringlumalabs.com/api/v2/capture/credits',
        headers: {
            ...commonHeaders
        }
    }
    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function getCaptures() {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://webapp.engineeringlumalabs.com/api/v2/capture?skip=0&take=50&order=DESC',
        headers: {
            ...commonHeaders
        }
    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

}

export function creatCapture(title) {
    const data = {
        'title': title
    }
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://webapp.engineeringlumalabs.com/api/v2/capture',
        headers: {
            ...commonHeaders
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

}

export function uploadCapture(file, uploadUrl) {

    // 将文件内容转为Buffer
    // const fileBuffer = Buffer.from(file.buffer);

    // 将Buffer转为字符串
    // const fileContent = fileBuffer.toString('utf8');
    console.log(file)
    const payload = fs.readFileSync(file.path)

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: uploadUrl || 'https://storage.googleapis.com/...',
        headers: {
            ...commonHeaders,
            'Content-Type': 'text/plain',
        },
        data: payload
    };

    return axios(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });


}

export function triggerCapture(slug) {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://webapp.engineeringlumalabs.com/api/v2/capture/' + slug,
        headers: {
            ...commonHeaders
        }
    };

    return axios(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getACapture(slug) {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://webapp.engineeringlumalabs.com/api/v2/capture/'+slug,
        headers: {
            ...commonHeaders
        }
    };

    return axios(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error);
        });
}
