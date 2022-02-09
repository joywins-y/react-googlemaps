import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      // <Map
      //   google={this.props.google}
      //   zoom={14}
      //   style={mapStyles}
      //   initialCenter={{
      //     lat: -1.2884,
      //     lng: 36.8233,
      //   }}
      // >
      //   <Marker
      //     onClick={this.onMarkerClick}
      //     name={"Kenyatta International Convention Centre"}
      //   />
      //   <InfoWindow
      //     marker={this.state.activeMarker}
      //     visible={this.state.showingInfoWindow}
      //     onClose={this.onClose}
      //   >
      //     <div>
      //       <h4>{this.state.selectedPlace.name}</h4>
      //     </div>
      //   </InfoWindow>
      // </Map>
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={"Current Location"} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

/**
 * http://www.krpano360.com/tuwenxiangjieshenqinggugedituapimiyao/
 * 需要生成google地图API 密钥
 */
export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_MAPS_API_KEY_GOES_HERE",
})(MapContainer);
// export default GoogleApiWrapper((props) => ({
//   apiKey: props.apiKey,
// }))(MapContainer);
