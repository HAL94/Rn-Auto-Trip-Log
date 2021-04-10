import React, { Component } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Text, Switch, StyleSheet } from 'react-native';
import MapViewer from '../MapViewer/MapViewer';
import { Dimensions } from "react-native";
import { Alert } from 'react-native';
import ActivityRecognition from 'react-native-activity-recognition';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

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
            location: null,
            switchValue: false,
            unsubscribe: null,
            detectedActivity: null,
            watchId: null
        }
        this.enableLocationWithActivity = this.enableLocationWithActivity.bind(this);   
    }

    watchActivity() {
        const subscription = ActivityRecognition.subscribe(detectedActivities => {
            const mostProbable = detectedActivities.sorted[0];
            console.log('MostProbable', mostProbable);
            this.setState({detectedActivity: JSON.stringify(mostProbable)});
            if (mostProbable['type'] === 'IN_VEHICLE') {
                this.watchPosition();
            }
          });
        this.setState({unsubscribe: subscription});
        ActivityRecognition.start(1000, 0);
    }

    enableLocationWithActivity(value) {
        this.setState({switchValue: value});
        if (value) {
            console.log('Auto Track Turned ON');
            checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION])
                .then((statuses) => {
                    console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION], "Checked");
                    console.log('ACTIVITY_RECOGNITION', statuses[PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION], "Checked");
                    const fineLocationResult = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
                    const activityRecognitionResult = statuses[PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION];
                    if (activityRecognitionResult === RESULTS.GRANTED && fineLocationResult === RESULTS.GRANTED) { 
                        this.watchActivity();                    
                    } else {
                        this.requestPermissions();
                    }
                });
        } else {
            this.stopWatchServices();
            console.log('Auto Track Turned OFF');
        }   
    }   

    
    watchPosition() {
        Geolocation.watchPosition((position) => {
            this.setState({location: position});
          }, error => Alert.alert('Error', JSON.stringify(error)), {enableHighAccuracy: true, distanceFilter: 1});
    }

    
    stopWatchServices() {
        if (this.state.watchId) {
            Geolocation.stopWatch(this.state.watchId);
        }
        if (this.state.unsubscribe) {
            ActivityRecognition.stop()
        }
    }

    requestPermissions() {
        requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION])
            .then((statuses) => {
                console.log('ACCESS_FINE_LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
                console.log('ACTIVITY_RECOGNITION', statuses[PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION]);
            }); 
    }

    componentDidMount() {
        this.requestPermissions();
    }

    componentWillUnmount() {
        if (this.state.unsubscribe) {
            this.state.unsubscribe();
        }
    }

    render() {
        let switchView = (
            <Switch 
                onValueChange={this.enableLocationWithActivity}
                value={this.state.switchValue}
            />
        );
        let displayView;

        if (this.state.location) {
            displayView = (
                <MapViewer location={this.state.location}/>
            );
        } 

        let detectedActvity;
        
        if (this.state.detectedActivity) {
            detectedActvity = <Text>Detected Activity: {this.state.detectedActivity}</Text>
        }

        return (
            <View style={styles.container}>
                {detectedActvity}
                {switchView}
                {displayView}
            </View>
        );
    }
}
