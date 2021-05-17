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
export const EditMarker = async (marker) =>{
    return fetch(`${localURL}userMarkers/${marker.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(marker)
      }).then(data => data.json());
}
export const AddNewMarker = async (param) =>{
    return fetch(`${localURL}userMarkers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    }).then(response => response.json())
    .then(resp =>{return resp} )
}

export const GetComments = (id) => { //Get comments for a particular marker
    return fetch(`${localURL}comments?userMarkerId=${id}&_expand=user`)
    .then(res => res.json())
  }

  export const DeleteComment = (comment) =>{
    return fetch(`${localURL}comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }).then(data => data.json());
  }

  export const EditComment = (comment) =>{
    return fetch(`${localURL}comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }).then(data => data.json());
  }

  export const AddComment = (comment) =>{
    return fetch(`${localURL}comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    }).then(response => response.json())
    .then(response =>{
        return response})
  }