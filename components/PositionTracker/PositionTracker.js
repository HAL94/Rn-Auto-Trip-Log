import React, { Component } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, StyleSheet } from 'react-native';
import MapViewer from '../MapViewer/MapViewer';
import { Dimensions } from "react-native";
import { Alert } from 'react-native';
import { check, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: width,
      height: height
    }
});

export default class PositionTracker extends Component {
    constructor() {
        super();
        this.state = {
            location: null
        }

        // this.requestActivityRecognitionPermission();       
    }

    checkActivityRecognitionPermission = () => {
        check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
            .then((result) => {
                switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    checkActivityRecognitionPermission = () => {
        check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION)
            .then((result) => {
                switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    requestPermission = (permissionType) => {
        return request(PERMISSIONS.ANDROID[permissionType]);
    };

    
    watchPosition() {
        Geolocation.watchPosition((position) => {
            this.setState({location: position});
          }, error => Alert.alert('Error', JSON.stringify(error)), {enableHighAccuracy: true, distanceFilter: 1});
    }

    componentDidMount() {
        requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION])
            .then((statuses) => {
                console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
                console.log('ACTIVITY_RECOGNITION', statuses[PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION]);
                const fineLocationResult = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
                if (fineLocationResult === RESULTS.GRANTED) {
                    this.watchPosition();
                }
            }); 
    }

    render() {
        let displayView;

        if (this.state.location) {
            displayView = (
                <MapViewer location={this.state.location}/>
            );
        } else {
            displayView = (
                <Text>Waiting...</Text>
            );
        }


        return (
            <View style={styles.container}>
                {displayView}
            </View>
        );
    }
}
