import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

// Define the interface for the component props
interface FeedItemProps {
  username: string;
  losses: number;
  stepsOwed: number;
  stepsToday: number;
  avatar: ImageSourcePropType | null;
  onCommentPress?: () => void;
  onLikePress?: () => void;
}

const FeedItem: React.FC<FeedItemProps> = ({
  username,
  losses,
  stepsOwed,
  stepsToday,
  avatar,
  onCommentPress,
  onLikePress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {avatar && <Image source={avatar} style={styles.avatar} />}
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.partitionedLikeComments}>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>{losses} Losses</Text>
        <Text style={styles.dataText}>{stepsOwed} Steps Owed</Text>
        <Text style={styles.dataText}>{stepsToday} Steps Today</Text>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onCommentPress} style={styles.button}>
            <Text>View Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLikePress} style={styles.button}>
            <Text>Like</Text>
          </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 'auto',
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    width: '60%',
    marginBottom: 20,
    height: 200,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dataContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  dataText: {
    fontSize: 16,
    marginBottom: -25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: '#E1E1E1',
    borderRadius: 5,
  },
  partitionedLikeComments: {
    flexDirection: 'column',
  },
});

export default FeedItem;