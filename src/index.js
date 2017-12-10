import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBgLjjtZysVtP8sbz4fdxF4EytRAoo3KVU",
  authDomain: "universidad-41c49.firebaseapp.com",
  databaseURL: "https://universidad-41c49.firebaseio.com",
  projectId: "universidad-41c49",
  storageBucket: "universidad-41c49.appspot.com",
  messagingSenderId: "130858667369"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
