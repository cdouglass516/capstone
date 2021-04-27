//this file is used to access data needed for the application.

const axios = require('axios');
export const getNashData = async () =>{
    try{
        const baseURL = 'https://data.nashville.gov/resource/';
        const getPublicArt = () => axios.get(`${baseURL}dqkw-tj5j.json`);
        const getHistorical = () => axios.get(`${baseURL}vk65-u7my.json`);
        const getParks = () => axios.get(`${baseURL}74d7-b74t.json`);
    const res = await axios.all([getPublicArt(), getHistorical(),getParks()]).then(axios.spread(function(res1, res2, res3) {
        console.log(res1);
        console.log(res2);
        console.log(res3);
        return res1;
      }));
      
      
    if(!res.status === 200){
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    
} catch(e){
    console.log(e);
    return 'error in getNashData'
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

