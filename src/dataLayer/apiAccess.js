//this file is used to access data needed for the application.

const axios = require('axios');
export const getNashData = async (type) => {
    try {
        const baseURL = 'https://data.nashville.gov/resource/';
        const localURL = 'http://localhost:8088/';
        const getPublicArt = () => axios.get(`${baseURL}dqkw-tj5j.json`);
        const getHistorical = () => axios.get(`${baseURL}vk65-u7my.json`);
        const getParks = () => axios.get(`${baseURL}74d7-b74t.json`);
        const getVenues = () => axios.get(`${localURL}venues`);
        const getUserAdded = () => axios.get(`${localURL}userMarkers`);
        switch (type) {
            case 'pa':
                try {
                    const res = await getPublicArt()
                    if (!res.status === 200) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.data;
                }
                catch (e) {
                    console.log(e);
                    return 'error in getNashData';
                }
            case 'hist':
                try {
                    const res = await getHistorical()
                    if (!res.status === 200) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.data;
                }
                catch (e) {
                    console.log(e);
                    return 'error in getNashData';
                }

            case 'park':
                try {
                    const res = await getParks()
                    if (!res.status === 200) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.data;

                }
                catch (e) {
                    console.log(e);
                    return 'error in getNashData';
                }
            case 'venue':
                try {
                    const res = await getVenues()
                    if (!res.status === 200) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.data;

                }
                catch (e) {
                    console.log(e);
                    return 'error in getNashData';
                }
                case 'user':
                    try {
                        const res = await getUserAdded()
                        if (!res.status === 200) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.data;
    
                    }
                    catch (e) {
                        console.log(e);
                        return 'error in getNashData';
                    }
            default:
                return 'No Data';
        }


    }
    catch (e) {

    }


}


