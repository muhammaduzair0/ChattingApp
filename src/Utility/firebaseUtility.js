import firestore from '@react-native-firebase/firestore';

export async function firebaseUserData(userData) {
  return await firestore().collection('Users').add(userData);
}

export async function getUserData() {
  return await firestore().collection('Users').get();
}

export async function getUserById(uid) {
  return await firestore().collection('Users').doc(uid).get();
}

export async function createThread(thread) {
  return await firestore().collection('Threads').add(thread);
}

export async function getThread(id, guestId) {
  return await firestore()
    .collection('Threads')
    .where('Users', 'in', [['1', '2']])
    .get();
}

export function checkThread(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    getThread(id).then(data => {
      console.log(data);
      if (data.length) {
        const thread = {
          ...data[0].data(),
          id: data[0].data(),
        };
      }
      data.forEach(ele => {
        console.log(ele);
      });
    });
  });
}
