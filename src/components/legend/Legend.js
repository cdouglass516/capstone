import './legend.css';
import legend from '../../static/legend.png'
import {getNashData} from '../../dataLayer/apiAccess'
export const Legend = () => {
    getNashData()
    .then(resp =>{
        })
    return (
        <div className="legend_div">
<img src={legend}></img>
        </div>
    )
}

// .cemeteries{
//     background-color: black;
// }
// .clubs{
//   background-color: #ff6624;
// }
// .userAdded{