import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

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
    .where('Users', 'in', [[id, guestId]])
    .get();
}

export function checkThread(user, guest) {
  return new Promise((resolve, reject) => {
    getThread(user.id, guest.id)
      .then(data => {
        if (data.docs.length > 0) {
          const thread = {
            ...data.docs[0].data(),
            id: data.docs[0].id,
          };
          resolve(thread);
        } else {
          createThread(threadData(user, guest))
            .then(thread => {
              resolve(thread);
            })
            .catch(reject);
        }
      })
      .catch(reject);
  });
}

export const searchData = async id => {
  return await firestore().collection('Users').where('uid', '==', id).get();
};

const threadData = (user, guest) => {
  let userObj = {};
  userObj[user.id] = {
    name: user.name,
    avatar: '',
    id: user.id,
  };
  userObj[guest.id] = {
    name: guest.name,
    avatar: '',
    id: guest.id,
  };
  const userThread = {
    lastMsg: '',
    createdAt: moment().format(),
    updatedAt: moment().format(),
    Users: [user.id, guest.id],
    ...userObj,
  };
  return userThread;
};
