//this file is used to access data needed for the application.

const axios = require('axios');
export const getNashData = async (type) => {
    try {
        const baseURL = 'https://data.nashville.gov/resource/';
        const getPublicArt = () => axios.get(`${baseURL}dqkw-tj5j.json`);
        const getHistorical = () => axios.get(`${baseURL}vk65-u7my.json`);
        const getParks = () => axios.get(`${baseURL}74d7-b74t.json`);
        const getVenues = () => axios.get('http://localhost:8088/venues')
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

            default:
                return 'No Data';
        }


    }
    catch (e) {

    }


}


// getCustomerData = () => axios.get(`${URL}/profile/${this.props.activeCustomerId}`);

//     getPermissions = () => axios.get(`${URL}/permissions/${this.props.activeCustomerId}`);

//     async componentDidMount() {
//         try {
//             const [customerData, customerPermissions] = await axios.all([ this.getCustomerData(), this.getPermissions() ]);
//             this.setState(
//                 activeCustomer: {
//                     data: customerData.data,
//                     permissions: customerPermissions.data
//                 }
//             );
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
// }

// `res.data` contains the parsed response body

