import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {checkThread, sendMessage, getMessage} from '../Utility/firebaseUtility';
import {GiftedChat} from 'react-native-gifted-chat';

const ConversationScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [userThread, setUserThread] = useState(null);
  const guestData = route.params?.data;

  const user = useSelector(state => state.accountReducer.user);
  useEffect(() => {
    checkThread(user, guestData).then(e => {
      setUserThread(e);
    });
  }, []);

  useEffect(() => {
    if (userThread !== null) {
      getMessage(userThread.id).then(e => {
        let element = [];
        e.docs.forEach(ele => {
          const messageObj ={
            ...ele.data()
          }
          element.push(messageObj);
        });
        setMessages(element);
      });
    }
  }, [userThread]);
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 1,
  //       text: 'Hello',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);
  const onSend = message => {
    const obj = {
      _id: message[0]._id,
      text: message[0].text,
      createdAt: new Date(),
      user: {
        _id: user.uid,
        name: user.name,
        avatar: user.imageUrl,
      },
    };
    sendMessage(userThread.id, obj).then(e => {
      console.log(e);
    });
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default ConversationScreen;
