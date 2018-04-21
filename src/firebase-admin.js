var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBFfjnaY7RB54ym7mMvudkOxtZS0FwR9YI",
    authDomain: "online-b5772.firebaseapp.com",
    databaseURL: "https://online-b5772.firebaseio.com",
    projectId: "online-b5772",
    storageBucket: "online-b5772.appspot.com",
    messagingSenderId: "985327627351"
};
firebase.initializeApp(config);
module.exports = firebase;

console.log('Firebase Admin Initialized');
