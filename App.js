/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import PositionTracker from './components/PositionTracker/PositionTracker';
import { View, Text } from 'react-native';
// import ActivityRecognition from 'react-native-activity-recognition';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      unsubscribe: null,
      detectionIntervalMillis: 1000,
      detectedActivity: null
    };
    
    // this.activityRecognitionUpdates();
    
  }
  
  componentDidMount() {
    // this.state.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
    //   const mostProbable = detectedActivities.sorted[0];
    //   console.log('DetectedActivity', mostProbable);
    //   this.state.detectedActivity = JSON.stringify(mostProbable);
    // });
    // ActivityRecognition.start(1000, 0);
  }

  

 
  startActivityRecognition() {
    
  }

  stopActivityRecognition() {
    ActivityRecognition.stop();
    this.state.unsubscribe();
  }

  render() {
    return (
      <View>
        <PositionTracker />
      </View>      
    );
  } 
}

