import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import {checkThread} from '../Utility/firebaseUtility';
import { GiftedChat } from 'react-native-gifted-chat';

const ConversationScreen = ({route}) => {
    const [messages, setMessages] = useState([])
    const gfc = route.params?.data
    const user =useSelector(state => state.accountReducer.user)
    console.log(gfc)
    useEffect(() => {
        // checkThread().then(e =>{   
        //     console.log(e)
        // })
    }, [])
  useEffect(() => {
    setMessages([
        {
        text: 'Hello',
        createdAt: new Date(),
       
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
