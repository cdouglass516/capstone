import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillXSquareFill } from "react-icons/bs";
import { AddNewMarker } from '../../dataLayer/appAccesss';
import { getNashData} from '../../dataLayer/apiAccess'
import './addMarker.css'

export const AddMarker = ({ isMarker, setIsMarker, marker, setUserAdds, markerLatLng }) => {
  const [markerObj, setMarkerObj] = React.useState({
    id: 0, markerSourcesId: 3, userId: 0, lastModifieddate: Date.now(), type: "", name: "", address: "", city: "", state: "", zip: "", 
    description: "", link: "",latitude: 0, longitude: 0,  nbrReviews: 1, ratingsTotal: 0
  })
  const closeAddMarker = () => {
    setIsMarker(false);
  }
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    //let formErrors = this.state.formErrors;

    switch (name) {
      case 'type':
        setMarkerObj({ ...markerObj, type: value });

        break;
      case 'name':
        setMarkerObj({ ...markerObj, name: value });
        break;
      case 'address':
        setMarkerObj({ ...markerObj, address: value });

        break;
      case 'city':
        setMarkerObj({ ...markerObj, city: value });

        break;
      case 'state':
        setMarkerObj({ ...markerObj, state: value });

        break;
      case 'zip':
        setMarkerObj({ ...markerObj, zip: value });

        break;
      case 'descr':
        setMarkerObj({ ...markerObj, description: value });

        break;
      case 'link':
        setMarkerObj({ ...markerObj, link: value });

        break;
        case 'ratingsTotal':
          setMarkerObj({ ...markerObj, ratingsTotal: value });
  
          break;
      default:
        break;
    }
  }
  const HandleSubmit = () => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    let NewMarker = {...markerObj};
    NewMarker.userId = user;
    NewMarker.latitude = markerLatLng.lat;
    NewMarker.longitude = markerLatLng.lng;
      AddNewMarker(NewMarker).then(resp => {
          getNashData('user').then(response => {
            response.forEach((item, index) => {
              if (item.longitude === undefined) {
                response.splice(index, 1)
              }
            })
            return response;
          }).then(data => {
            setUserAdds(data);
          })

        return resp;
      });
  }
  return (
    <div
      className={`marker__container marker__container--${isMarker && marker && "active"
        }`}
    >
      <div className="emptyDiv"></div>

      {/* <div
          className="marker__picture"
        ></div> */}
      <div className="marker__description__container">
        <div className="marker__description"><h3>ADD MARKER PAGE</h3>
          <form onSubmit={HandleSubmit}>
            <div>
              <label htmlFor='type'>Type</label>
              <input
                name='type'
                placeholder='Type'
                value={markerObj.type}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                name='name'
                placeholder='Name'
                value={markerObj.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input
                name='address'
                placeholder='Address'
                value={markerObj.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='city'>City</label>
              <input
                name='city'
                placeholder='City'
                value={markerObj.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='state'>City</label>
              <input
                name='state'
                placeholder='State'
                value={markerObj.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='zip'>Zip Code</label>
              <input
                name='zip'
                placeholder='City'
                value={markerObj.zip}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='descr'>Description</label>
              <input
                name='descr'
                placeholder='Description'
                value={markerObj.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='descr'>Add Link</label>
              <input
                name='link'
                placeholder='Link'
                value={markerObj.link}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='ratingsTotal'>Rate 1-4 this place</label>
              <input
                name='ratingsTotal'
                placeholder='Rate This'
                value={markerObj.rate}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Create Marker</button>
            </div>
          </form>
        </div>

        <div style={{ display: 'flex' }}>
          <a className="marker__button" href={marker?.seeMoreLink} target="_blank" rel="noreferrer">See more</a>
        </div>
      </div>
      <div className="marker__close" onClick={() => closeAddMarker()}>
        <BsFillXSquareFill />
      </div>
    </div>
  );

}

// "id": 1,
//       "description": "Okay place to drink",
//       "link": "http://www.thereddoorsaloon.com/east-nashville.html",