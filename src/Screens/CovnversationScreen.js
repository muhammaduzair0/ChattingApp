import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  checkThread,
  sendMessage,
  getMessage,
  getMessageListener,
} from '../Utility/firebaseUtility';
import {GiftedChat} from 'react-native-gifted-chat';
import moment from 'moment';
const ConversationScreen = ({route}) => {
  const [userThread, setUserThread] = useState(null);
  const guestData = route.params?.data;

  const user = useSelector(state => state.accountReducer.user);
  const messagesState = useSelector(state => state.messageReducer.message);
  const dispatch = useDispatch();
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
          const messageObj = {
            ...ele.data(),
            _id: ele.id,
          };
          element.push(messageObj);
        });
        dispatch({
          type: 'SET_MESSAGES',
          payload: element,
        });
      });
    }
  }, [userThread]);

  const userMessage = msg => {
    dispatch({
      type: 'SET_MESSAGES',
      payload: [msg],
    });
  };

  useEffect(() => {
    if (userThread) {
      if (messagesState.length > 0) {
        let index = messagesState.length - 1;
        let createdAt = messagesState[index].createdAt;
        getMessageListener(userThread.id, createdAt, userMessage);
      } else {
        let newDate = moment().utc().valueOf();
        getMessageListener(userThread.id, newDate, userMessage);
      }
    }
  }, [userThread]);

  const onSend = message => {
    const obj = {
      _id: message[0]._id,
      text: message[0].text,
      createdAt: moment().utc().valueOf(),
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
      messages={messagesState}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default ConversationScreen;
