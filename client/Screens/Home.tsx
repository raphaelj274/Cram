import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export const Home = ({ navigation }:any) => {
  return (
    <View style={styles.container}>
      <Text
      style={styles.home}
      >Home</Text>
      <Button
        title="Login"
        style={styles.btn}
        onPress={() => {
          navigation.push('Screen2', { paramA: 'Hello!' })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  home: {
    backgroundColor: 'orange',
    padding: 50,
    textAlign: 'center',
    flex: 1
  },
  btn: {
    padding: 50
  }
})
