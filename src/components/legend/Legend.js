import './legend.css';
export const Legend = () => {

    return (
        <div className="legend_div">
            <span className="dot venues"></span>
            <span className="legend_text"> Venues </span>
            <span className="dot historical"></span>
            <span className="legend_text"> Historical Markers </span>
            <span className="dot parks"></span>
            <span className="legend_text"> Parks </span>
            <span className="dot art"></span>
            <span className="legend_text"> Public Art </span>
            <span className="dot clubs"></span>
            <span className="legend_text"> Clubs </span>
            <span className="dot userAdded"></span>
            <span className="legend_text"> User Added </span>
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