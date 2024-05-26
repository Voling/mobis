import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Feed = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>User Feed</Text>
      {/* Example feed items */}
      <Text style={styles.item}>Feed Item 1</Text>
      <Text style={styles.item}>Feed Item 2</Text>
      <Text style={styles.item}>Feed Item 3</Text>
      {/* Add more items as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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