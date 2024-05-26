import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default LandingPage = () => {
    return (
        <View style={styles.backgroundContainer}>
    <Text> hello chat </Text>
    </View>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      backgroundColor: '#8D8383',
      alignItems: 'center',
      justifyContent: 'center',
    },
});