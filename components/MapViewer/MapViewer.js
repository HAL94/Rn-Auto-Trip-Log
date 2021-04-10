import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Aux from '../Hoc/Jack';
import TripInfo from '../TripInfo/TripInfo';
import haversine from 'haversine';


const styles = StyleSheet.create({
    infoWrapper: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      flexDirection: 'row',
      flex: 1
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    }
});

export default class MapViewer extends Component {
    state = {
        location: this.props.location,
        direction: null,
        speed: null,
        distance: null,
        prevCoordinate: null,
        unsubscribe: null
    }

    getHeading = (x) => {
        if((x>0 && x<=23) || (x>338 && x <=360))
            return 'N';
        else if(x>23 && x<=65)
            return 'NE';
        else if(x>65 && x<=110)
            return 'E';
        else if(x>110 && x<=155)
            return 'SE';
        else if(x>155 && x<=203)
            return 'S';
        else if(x>203 && x<=248)
            return 'SW';
        else if(x>248 && x<=293)
            return 'W';
        else if(x>293 && x<=338)
            return 'NW';
    }

    updateTracking = () => {
        // console.log('Success', position);
        this.setState({
            location: this.props.location,
            direction: this.getHeading(this.props.location.coords.heading),
            speed: this.props.location.coords.speed
        });
        let curDistance = 0;

        if (this.state.prevCoordinate) {
            curDistance = this.state.distance + haversine(this.state.prevCoordinate, this.props.location.coords);
            this.setState({distance: curDistance});
            // console.log(this.state.distance);
        }

        this.setState({prevCoordinate: this.props.location.coords});
        
    }

    errHandler = (error) => {
        console.log('HERE ERROR', error);
        Alert.alert('Error', JSON.stringify(error));
    }

    
    
    componentDidMount() {
        this.updateTracking();      
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.coords != this.props.location.coords) {
            this.updateTracking();
        }        
    }

    render() {
        return (
            <Aux>
                {/* A map was here, hence the class called MapViewer */}
                <View style={styles.infoWrapper}>
                    <TripInfo title="Distance" unit="km" value={this.state.distance} />
                    <TripInfo title="Speed" unit="km/h" value={this.state.speed} />
                    <TripInfo title="Direction" value={this.state.direction} />
                </View>       
            </Aux>
        )
    }
}