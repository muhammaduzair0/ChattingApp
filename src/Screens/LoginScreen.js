import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebaseUserData} from '../Utility/firebaseUtility';

// FACEBOOK LOGIN FUNCTION
function onFacebookButtonPress() {
  return LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(ele => {
      if (ele.isCancelled) {
        throw 'user cancelled';
      } else {
        return AccessToken.getCurrentAccessToken();
      }
    })
    .then(ele => {
      if (!ele) {
        throw 'Something went wrong obtaining access token';
      } else {
        return ele;
      }
    })
    .then(ele2 => {
      return auth.FacebookAuthProvider.credential(ele2.accessToken);
    })
    .then(ele3 => {
      return auth().signInWithCredential(ele3);
    })
    .catch(e => {
      console.log(e, 'Error');
    });
}

// GOOGLE LOGIN FUNCTION
function onGoogleButtonPress() {
  // Get the users ID token
  return GoogleSignin.signIn()
    .then(e => {
      // Create a Google credential with the token
      return auth.GoogleAuthProvider.credential(e.idToken);
    })
    .then(ele => {
      // Sign-in the user with the credential
      return auth().signInWithCredential(ele);
    })
    .catch(error => console.log(error, 'Login Error'));
}

const LoginScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  GoogleSignin.configure({
    webClientId:
      '962585502126-pu4gn7vs8qnpemh7qj0pdnos33qtfi2o.apps.googleusercontent.com',
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#DB4437',
            paddingVertical: 20,
            paddingHorizontal: 50,
            borderRadius: 5,
            marginBottom: 20,
          }}
          title="Google Sign-In"
          onPress={() => {
            let obj = {};
            onGoogleButtonPress()
              .then(e => {
                obj = {
                  name: e.user.displayName,
                  email: e.user.email,
                  uid: e.user.uid,
                  imageUrl: e.user.photoURL,
                };
                return firebaseUserData(obj);
              })
              .then(e => {
                const userDetails = {...obj};
                dispatch({
                  type: 'SET_USER',
                  payload: userDetails,
                });
                navigation.navigate('ChatScreen');
              })
              .catch(error => console.log(error));
          }}>
          <Text style={{color: 'white', fontWeight: '700'}}>GOOGLE LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#4267B2',
            paddingVertical: 20,
            paddingHorizontal: 50,
            borderRadius: 5,
          }}
          onPress={() => {
            let obj = {};
            onFacebookButtonPress()
              .then(e => {
                obj = {
                  name: e.user.displayName,
                  email: e.user.email,
                  uid: e.user.uid,
                  imageUrl: e.user.photoURL,
                };
                console.log(obj);
                return firebaseUserData(obj);
              })
              .then(e => {
                const userDetails = {...obj};
                dispatch({
                  type: 'SET_USER',
                  payload: userDetails,
                });
                navigation.navigate('ChatScreen');
              })
              .catch(error => console.log(error));
          }}>
          <Text style={{color: 'white', fontWeight: '700'}}>
            FACEBOOK LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
