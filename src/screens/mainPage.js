import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';

export const MainPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Hello this is main page</Text>
      <Button
        title="Go to WebRTC"
        onPress={() => {
          navigation.navigate('RTC');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
