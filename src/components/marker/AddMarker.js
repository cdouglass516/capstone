import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, RangeSlider, Form, Button } from 'react-bootstrap';
import { BsFillXSquareFill } from "react-icons/bs";
import { AddNewMarker } from '../../dataLayer/appAccesss';
import { getNashData } from '../../dataLayer/apiAccess'
import './addMarker.css'

export const AddMarker = ({ isMarker, setIsMarker, marker, setUserAdds, markerLatLng }) => {
  const [sliderVal, setSliderVal] = React.useState(0);
  const [markerObj, setMarkerObj] = React.useState({
    id: 0, markerSourcesId: 3, userId: 0, lastModifieddate: Date.now(), type: "", name: "", address: "", city: "", state: "", zip: "",
    description: "", link: "", latitude: 0, longitude: 0, nbrReviews: 1, ratingsTotal: 0
  })
  const closeAddMarker = () => {
    setIsMarker(false);
  }
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    //let formErrors = this.state.formErrors;
    switch (id) {
      case 'type':
        setMarkerObj({ ...markerObj, type: value });

        break;
      case 'name':
        setMarkerObj({ ...markerObj, name: value });
        break;
      case 'descr':
        setMarkerObj({ ...markerObj, description: value });

        break;
      case 'link':
        setMarkerObj({ ...markerObj, link: value });

        break;
      case 'ratingsTotal':
        setMarkerObj({ ...markerObj, ratingsTotal: value });
        setSliderVal(value);
        break;
      default:
        break;
    }
  }
  const HandleSubmit = () => {
    let user = parseInt(sessionStorage.getItem("exploreNashvegas_user"));
    let NewMarker = { ...markerObj };
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
        <div className="marker__description addMarker_form"><h6>ADD MARKER PAGE</h6>
          <Form onSubmit={HandleSubmit}>
            <Form.Group>
              <Form.Label className="my-1 mr-2 ow_formText" htmlFor="inlineFormCustomSelectPref">
                Type
  </Form.Label>
              <Form.Control
                onChange={handleChange}
                as="select"
                className="my-1 mr-sm-2 ow_formText"
                id="type"
                value={markerObj.type}
                custom
              >
                <option value="">Choose...</option>
                <option value="bar">Bar</option>
                <option value="cs">Coffee Shop</option>
                <option value="cafe">Cafe</option>
                <option value="restaurant">Restaurant</option>
                <option value="store">Store</option>
                <option value="Music Venue">Music Venue</option>
                <option value="store">Store</option>
                <option value="other">Other</option>
              </Form.Control>
              <Form.Control type="text" placeholder="Name" className="ow_formText" onChange={handleChange} id="name" />
            


            {/* <Form.Group> */}
              <Form.Control as="textarea" rows={3} placeholder="Enter Description"  className="ow_formText" onChange={handleChange} id="description" />
            {/* </Form.Group> */}
            {/* <Form.Group > */}
              {/* <Form.Label>Link</Form.Label> */}
              <Form.Control type="link" placeholder="Link"   className="ow_formText" onChange={handleChange} id="link"/>
            {/* </Form.Group> */}
            {/* <Form.Group as={Row}> */}
            </Form.Group>
            <Form.Group >
              <Col xs="9">
                <Form.Label>Rate the place</Form.Label>
                <Form.Control type="range" value={sliderVal} id="ratingsTotal"  className="ow_formText"
                  onChange={handleChange} />
              </Col>
              <Col xs="3">
                <Form.Control value={sliderVal} onChange={handleChange}  className="ow_formText" />
              </Col>
            </Form.Group>
            
            
            <Button variant="primary" type="submit" className="btn_formSubmit">
              Add Marker
            </Button>
          </Form>

        </div>

        <div style={{ display: 'flex' }}>
          {/* <a className="marker__button" href={marker?.seeMoreLink} target="_blank" rel="noreferrer">See more</a> */}
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