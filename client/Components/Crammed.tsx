import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { furtherTopics } from '../Services/ApiService';

export const Crammed:any = ({ route, navigation }: any) => {
  const topic = route.params.paramC;
  return (
    <View style={styles.container}>
      <ScrollView style= {styles.scroll}>
          <View style={topic.title === 'Not Found' ? styles.notFoundContainer : styles.videoContainer}>
            <Text style={styles.videoTitle}>{topic.title}</Text>
            {topic.title === 'Not Found' ?
            <View>
              <Text>
                {topic.url}
              </Text>
            </View>
            :
            <View style={styles.found}>
              <Text style={styles.caption}>Andre told you to read the docs again didnt he? Don't worry - Cram is here to the rescue!</Text>
              <WebView source={{ uri: topic.url }} style={styles.webview} />
            </View>
            }
            <View style={styles.bulletContainer}>
            {topic.bullets.map((bullet:string) => {
              return (
                <Text key={bullet} style={styles.bullet}>{bullet}</Text>
              )
            })}
            </View>
            <View style={styles.relatedContainer}>
              <Text>Did you cram? Check out these related pages if you have time!</Text>
              {topic.related.map((relatedTopic:string) => {
                return (
                <TouchableOpacity
                  key={relatedTopic}
                  style={styles.relatedBtn}
                  onPress={async () => {
                    const topic = await furtherTopics(relatedTopic);
                    return navigation.push('Crammed', { paramC: topic })
                  }}
                >
                  <Text>
                    {relatedTopic}
                  </Text>
                </TouchableOpacity>)
              })}
            </View>
          </View>
        </ScrollView>
        <Button
          title="Cram again?"
          type="outline"
          onPress={() => {
            navigation.navigate('Cram');
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
  },
  notFoundContainer: {
    height: 600,
    padding: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  videoContainer: {
    padding: 50,
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    height: 1000
  },
  webview: {
    margin: 20,
    padding: 50,
    width: 300,
    borderWidth: 1
  },
  videoTitle: {
    textAlign: 'center',
    fontSize: 30
  },
  bulletContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: 300,
    height: 500
  },
  bullet: {
    textAlign: 'center',
    width: '80%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 5,
    display:'flex',
    flex: 1,
    margin: 10,
  },
  scroll: {
    display: 'flex',
    flex: 1,
  },
  caption: {
    padding: 10
  },
  relatedContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: 150,
    margin: 10
  },
  relatedBtn: {
    borderWidth: 1,
    display: 'flex',
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  found: {
    height: 500
  }
})