import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBg6qga-5Nfk3R0Z5oIuO4rBFnvDQDJFro",
  authDomain: "spotify-clone-24a56.firebaseapp.com",
  projectId: "spotify-clone-24a56",
  storageBucket: "spotify-clone-24a56.appspot.com",
  messagingSenderId: "137865158840",
  appId: "1:137865158840:web:aef404cc5dc6b478c2944d",
  measurementId: "G-WGNHZZE91Q",
};
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const auth = getAuth(app);

//ios: 481341226583-8bjrsqqqqbvsq5kbh63mp2i9n4qu73v0.apps.googleusercontent.com
// android:  481341226583-b5g6dtuprmpocek4rmvli7vooeojssu8.apps.googleusercontent.com
