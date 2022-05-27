import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {getUserData} from '../Utility/firebaseUtility';

const ChatScreen = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData().then(e => {
      let arr = [];
      e.forEach(data => {
        arr.push(data.data());
      });
      setUserData(arr);
    });
  }, []);
  return (
    <ScrollView>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Active Users
        </Text>
      </View>
      {userData.map((data, index) => {
        return (
          <View
            key={index}
            style={{
              marginHorizontal: 20,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <View>
                <Image
                  style={{width: 50, height: 50, borderRadius: 45}}
                  source={{uri: data.imageUrl}}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ChatScreen;
