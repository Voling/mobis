import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '../../src/aws-exports';
import { Auth } from 'aws-amplify';


const users = [
  { id: 1, name: 'SuperPlayerGirl', score: 670, rank: 1 },
  { id: 2, name: 'SuperPlayerGirl', score: 670, rank: 2 },
  { id: 3, name: 'SuperPlayerGirl', score: 670, rank: 3 },
  { id: 4, name: 'SuperPlayerGirl', score: 670, rank: 4 },
  { id: 5, name: 'YOU', score: 670, rank: 5 },
  { id: 6, name: 'SuperPlayerGirl', score: 670, rank: 6 },
  { id: 7, name: 'SuperPlayerGirl', score: 670, rank: 4 },
  { id: 8, name: 'SuperPlayerGirl', score: 670, rank: 4 },
  { id: 9, name: 'SuperPlayerGirl', score: 670, rank: 4 },
];


const Leaderboard = () => {
  Amplify.configure(awsconfig);
  // const [users, setUsers] = useState([]);
  // const userInfo = {
  //   username: 'testuserpoop',
  //   preferred_username: 'poooop',
  //   password: 'password12',
  //   email: 'dadbbadba@gmail.com',
  //   phone_number: '+1234567890',
  //   runExperience: '1',
  // };
  // const fetchUsers = async () => {
    // const response = await fetch("https://pfcd323x70.execute-api.us-west-1.amazonaws.com/dev/auth/signup", 
    // {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userInfo),
    // });
    // const response = await fetch("https://pfcd323x70.execute-api.us-west-1.amazonaws.com/dev/friends/leaderboard", 
    // {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const data = await response.json();
    // console.log('API Response:', data);
    // const signUpResponse = await Auth.signUp(userInfo);
    //@ts-ignore
    // setUsers([...data, { id: 3, name: 'YOU', rank: 1 }]);
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>This Week</Text>
      </View>
      <ScrollView>
        {users.map((user, index) => (
          <View
              //@ts-ignore
            key={user.id}
            style={[
              styles.userContainer,
                  //@ts-ignore
              user.name === 'YOU' ? styles.currentUser : null,
            ]}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{user.rank}</Text>
              <Image
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.userImage}
              />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#FF6347',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#444444',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  currentUser: {
    backgroundColor: '#FF6347',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  scoreText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default Leaderboard;