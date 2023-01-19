import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, NativeModules} from 'react-native';
import {DyteMeeting} from '@dytesdk/mobile';
import {registerGlobals} from 'react-native-webrtc';
import {useNavigation} from '@react-navigation/native';
// import {NativeEventEmitter} from 'react-native';

// const eventEmitter = new NativeEventEmitter(NativeModules);

registerGlobals();

const organizationId = 'c82f8f7f-0fee-4280-9bca-3d44398c2b54';
const apiKey = '661af6c6c28f19a8c32e';

const room = 'axiemc-xksumd';
const meetID = '68176558-e438-4ee1-93d2-51e5ef1485c8';

const pic_url =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fool.com%2Finvesting%2F2017%2F07%2F10%2Fhere-are-the-average-prices-for-boeings-5-major-co.aspx&psig=AOvVaw27WBDuZN5wjiTl7HIv8Hga&ust=1673785416965000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLCEiNyGx_wCFQAAAAAdAAAAABAJ';

export const WebRTC = () => {
  const [meetingId, setMeetingId] = useState();
  const [roomNam, setRoomName] = useState();
  console.log('room name is ', roomNam);
  const [AToken, setAuthToken] = useState();
  const navigation = useNavigation();
  //   useEffect(() => {
  //     console.log(apiKey);

  //     const getMeet = async () => {
  //       const rep = await fetch(
  //         `https://api.cluster.dyte.in/v1/organizations/${organizationId}/meeting`,
  //         {
  //           method: 'POST', // or 'PUT'
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: apiKey,
  //           },
  //           body: JSON.stringify({
  //             title: 'Timpass',
  //             presetName: 'trialOne',
  //             authorization: {
  //               waitingRoom: false,
  //               closed: false,
  //             },
  //             recordOnStart: false,
  //             liveStreamOnStart: false,
  //           }),
  //         },
  //       )
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log('Success:', data.data.meeting);
  //           setMeetingId(data.data.meeting.id);
  //           setRoomName(data.data.meeting.roomName);
  //           // addparticipant();
  //         })
  //         .catch(error => {
  //           console.error('Error:', error);
  //         });
  //     };
  //     getMeet();
  //   }, []);
  useEffect(() => {
    const addparticipant = async () => {
      try {
        const rep = await fetch(
          `https://api.cluster.dyte.in/v1/organizations/${organizationId}/meetings/${meetID}/participant`,
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
  }, []);

  return (
    <DyteMeeting
      onInit={meeting => {
        meeting.on(meeting.Events.disconnect, () => {
          navigation.navigate('Main');
        });
        meeting.on(meeting.Events.participantJoin, participant => {});
        // meeting.on(meeting.Events.chatMessage, chatMessage => {});
        meeting.on(meeting.Events.roomMessage, message => {
          meeting.sendRoomMessage(message);
        });
      }}
      clientId={organizationId}
      meetingConfig={{
        roomName: room,
        authToken: AToken,
      }}
    />
  );
};
