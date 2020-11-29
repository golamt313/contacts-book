import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD5TvZYR-ZALVcLec73jNyTSbIEBZRRPx0",
    authDomain: "contacts-crud-7e55d.firebaseapp.com",
    databaseURL: "https://contacts-crud-7e55d.firebaseio.com",
    projectId: "contacts-crud-7e55d",
    storageBucket: "contacts-crud-7e55d.appspot.com",
    messagingSenderId: "687715159678",
    appId: "1:687715159678:web:7ed2ce30667aef425a922f"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export { storage, firebase as default };