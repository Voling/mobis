import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default function TabTwoScreen() {
  return (
   <View>
    <TextInput placeholder='User Input' style={styles.textInputStyle}>
    </TextInput>
   </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInputStyle: {
    backgroundColor: 'rgb(100,100,100)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '50%',

  }
});
