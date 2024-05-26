import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FeedItem from '@/components/FeedPage/FeedItemComponent';

const Feed = () => {
  
    

    // from feed we need to fetch
    // an array of user data
    // this data includes:
    // username object with losses, stepsowed, steps today, avatar pic
    // map over the data, create feed item for each user

  return (
    <View style={styles.backgroundContainer}>
    <ScrollView style={styles.container}>
      <FeedItem username="You" losses={69} stepsOwed={69420} stepsToday={1337} avatar={null}/>
      <FeedItem username="dabber123" losses={69} stepsOwed={69420} stepsToday={1337} avatar={null}/>
      <FeedItem username="loltyler1" losses={69} stepsOwed={69420} stepsToday={1337} avatar={null}/>
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Feed;