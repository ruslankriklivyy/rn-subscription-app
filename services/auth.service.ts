import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

GoogleSignin.configure({
  webClientId: process.env.FIREBASE_AUTH_WEB_CLIENT_ID,
});

export interface IRegisterAndLoginPayload {
  email: string;
  password: string;
}

export const authService = {
  register: async ({email, password}: IRegisterAndLoginPayload) => {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore().collection('users').add({
        uid: user.uid,
        full_name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }

      throw error;
    }
  },

  login: async ({email, password}: IRegisterAndLoginPayload) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }

      throw error;
    }
  },

  loginWithGoogle: async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  },
};
