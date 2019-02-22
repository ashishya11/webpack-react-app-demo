import React from 'react';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import Geocode from "react-geocode";
import { TextField } from '../../components/TextField';
import styles from './Map.scss';

const params = { v: '1', key: 'AIzaSyCR_IWHQZb1tARqY1BS6tL6xA2ZoBDsL1o' };

Geocode.setApiKey("AIzaSyCR_IWHQZb1tARqY1BS6tL6xA2ZoBDsL1o");

class Map extends React.Component {

    constructor(props) {
        super(props);
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            address: this.props.address,
            currentLocation: {
                lat: lat,
                lng: lng,
            },

        };
    }

    componentDidMount() {
        this.onLoadMap();
    }

    onLoadMap = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords;
            Geocode.fromLatLng(coords.latitude, coords.longitude).then(
                response => {
                    let add = response.results[0].formatted_address;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        },
                        address: add,
                    });
                },
                error => {
                    console.error(error);
                }
            );

        });
    }

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    }

    onCloseClick() {
        console.log('onCloseClick');
    }

    handleInputChange = key => e => {
        let inputValue = e.target.value;
        this.setState({
            [`${key}`]: inputValue,
        }, () => {
            const location = this.state.address;
            Geocode.fromAddress(location).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    this.setState({
                        currentLocation: {
                            lat: lat,
                            lng: lng
                        }
                    });
                },
                error => {
                    console.error(error);

                }
            );
        });
    };

    formatDisplay = (text, defaultText) => {
        if(!text) return defaultText;
        const value = JSON.parse(text);
        return value;
    }

    render() {

        const { currentLocation, address } = this.state;
        return (
            <div className={styles.mainContainer}>
                <div className={styles.mapSearchField}>
                    <TextField
                        type="text"
                        value={address}
                        placeholder={'Search your address'}
                        onChange={this.handleInputChange('address')}
                    />
                </div>
                <div className={styles.mapDisplayBox}>
                    <Gmaps
                        height={'calc(50vh - 50px)'}
                        width={'60%'}
                        lat={currentLocation.lat}
                        lng={currentLocation.lng}
                        zoom={15}
                        loadingMessage={'Loading MAP'}
                        params={params}
                        onMapCreated={this.onMapCreated}
                    >
                        <Marker
                            lat={currentLocation.lat}
                            lng={currentLocation.lng}
                            draggable={false}
                        />
                    </Gmaps >
                </div>
            </div>
        );
    }

};

export default Map;

Map.defaultProps = {
    zoom: 15,
    initialCenter: {
        lat: '',
        lng: ''
    },
    visible: true,
    address: ''
};