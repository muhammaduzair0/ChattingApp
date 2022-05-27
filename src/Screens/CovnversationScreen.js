import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {getThread} from '../Utility/firebaseUtility';
import { GiftedChat } from 'react-native-gifted-chat';

const ConversationScreen = ({route}) => {
    const [messages, setMessages] = useState([])
    const id = route.params
    useEffect(() => {
        getThread().then((e)=> {
            console.log(e)
        })
    }, [])
  useEffect(() => {
    setMessages([
        {
        _id: id,
        text: 'Hello',
        createdAt: new Date(),
        user:{
            _id: id
        }
        }
    ])
  }, []);
  return (
    <View>
      <Text>Conversation Screen</Text>
    </View>
  );
};

export default ConversationScreen;
