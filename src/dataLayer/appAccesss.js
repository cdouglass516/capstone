const axios = require('axios');
const localURL = 'http://localhost:8088/';

export const GetUserbyEmail = async (param) => {
    try {
        const res = await axios.get(`${localURL}users?email=${param}`)
        if (!res.status === 200) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.data;
    }
    catch (e) {
        console.log(e);
        return 'error in getUserByEmail';
    }
}

export const GetUserbyId = async (param) => {
    try {
        const res = await axios.get(`${localURL}users/${param}`)
        if (!res.status === 200) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.data;
    }
    catch (e) {
        console.log(e);
        return 'error in getUserbyId';
    }
}

export const AddUser = async (param) => {
    try {
        const res = await axios.post(`${localURL}users`, param);
        if (!res.status === 200) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.data;
    }
    catch (e) {
        console.log(e);
        return 'error in addUser';
    }
}

export const EditUser = async (param) => {

    try {
        const res = await axios.put(`${localURL}users/${param.id}`, param);
        if (!res.status === 200) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.data;
    }
    catch (e) {
        console.log(e);
        return 'error in addUser';
    }


}