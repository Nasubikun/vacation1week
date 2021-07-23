import '../styles/globals.css'
import '../styles/Diary.css'
import firebase from "firebase/app";
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDkms57akC85RCpSGmh1BlNKs6B0VIz7OI",
  authDomain: "vacation1weeknext.firebaseapp.com",
  databaseURL: "https://vacation1weeknext-default-rtdb.firebaseio.com",
  projectId: "vacation1weeknext",
  storageBucket: "vacation1weeknext.appspot.com",
  messagingSenderId: "180175158928",
  appId: "1:180175158928:web:e0ebd8f5a8b29cdd296215",
  measurementId: "G-9X8J0DM7JS"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.database();
console.log(db)



function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
