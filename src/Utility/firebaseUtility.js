import firestore from '@react-native-firebase/firestore';

export async function firebaseUserData(userData){
    return await firestore().collection('Users').add(userData);
}

export async function getUserData(){
    return await firestore().collection('Users').get()
}