import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALl_E1ft97XHHVtjlezyZy3kBB-fK_Gxs",
  authDomain: "photo-gallery-736ac.firebaseapp.com",
  projectId: "photo-gallery-736ac",
  storageBucket: "photo-gallery-736ac.appspot.com",
  messagingSenderId: "765465393675",
  appId: "1:765465393675:web:879b0683e24eb2409ce50e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectStorage, projectFirestore, timestamp}