import React, {useEffect, useState} from 'react';
import {DyteMeeting} from '@dytesdk/mobile';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {registerGlobals} from 'react-native-webrtc';

const organizationId = 'c82f8f7f-0fee-4280-9bca-3d44398c2b54';
const apiKey = '661af6c6c28f19a8c32e';
const headers = {
  'Content-Type': 'application/json',
  authorization: apiKey,
};
// const meetingId = '8888be5e-7c8a-460b-a501-c16254d39a13';
registerGlobals();
const pic_url =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fool.com%2Finvesting%2F2017%2F07%2F10%2Fhere-are-the-average-prices-for-boeings-5-major-co.aspx&psig=AOvVaw27WBDuZN5wjiTl7HIv8Hga&ust=1673785416965000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLCEiNyGx_wCFQAAAAAdAAAAABAJ';

const App = () => {
  const [meetingId, setMeetingId] = useState();
  const [roomNam, setRoomName] = useState();
  const [AToken, setAuthToken] = useState();
  useEffect(() => {
    console.log(apiKey);

    const getMeet = async () => {
      const rep = await fetch(
        `https://api.cluster.dyte.in/v1/organizations/${organizationId}/meeting`,
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
            Authorization: apiKey,
          },
          body: JSON.stringify({
            title: 'Timpass',
            presetName: 'trialOne',
            authorization: {
              waitingRoom: false,
              closed: false,
            },
            recordOnStart: false,
            liveStreamOnStart: false,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data.data.meeting);
          setMeetingId(data.data.meeting.id);
          setRoomName(data.data.meeting.roomName);
          // addparticipant();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    getMeet();
  }, []);
  useEffect(() => {
    const addparticipant = async () => {
      try {
        const rep = await fetch(
          `https://api.cluster.dyte.in/v1/organizations/${organizationId}/meetings/${meetingId}/participant`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: apiKey,
            },
            body: JSON.stringify({
              clientSpecificId: 'abhay',
              userDetails: {
                name: 'akg',
                picture: pic_url,
              },
              //"presetName": "trialOne",
              roleName: 'participant',
            }),
          },
        )
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data.data.authResponse.authToken);
            setAuthToken(data.data.authResponse.authToken);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } catch (e) {
        console.log(e);
      }
    };
    addparticipant();
  }, [meetingId]);

  return (
    <DyteMeeting
      onInit={meeting => {}}
      clientId={organizationId}
      meetingConfig={{
        roomName: roomNam,
        authToken: AToken,
      }}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
