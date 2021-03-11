import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    runInfoWrapper: {
		backgroundColor: 'rgba(255,255,255,0.75)',
		paddingVertical: 25
	},
	runInfoTitle: {
		textAlign: 'center',
		fontWeight: '700',
		color: '#666'
	},
	runInfoValue:{
		textAlign: 'center',
		fontSize: 24,
		fontWeight: '200'
	}
});

export default class TripInfo extends Component {
    // state = {
    //     value: this.props.value,
    //     unit: this.props.unit,
    //     title: this.props.title
    // };

    formatValue = () => {
        if (typeof(this.props.value) === 'number') {
            return [parseFloat(this.props.value.toFixed(2)), this.props.unit].join(' ');
        }
        return this.props.value
    }

    render() {
        let value = this.props.value ? this.formatValue() : '-';
        return (
            <View style={[styles.runInfoWrapper, {flex: 1, flexDirection: 'column-reverse'}]}>
                <Text style={styles.runInfoTitle}>{this.props.title.toUpperCase()}</Text>
                <Text style={styles.runInfoValue}>{value}</Text>
            </View>
        );
    }
}