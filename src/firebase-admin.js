
var firebase = require("firebase");


var config = {
  apiKey: "AIzaSyCIIHryAuKXee04I8YuXTffFZd262msz_g",
  authDomain: "admin-e8a7b.firebaseapp.com",
  databaseURL: "https://admin-e8a7b.firebaseio.com",
  storageBucket: "admin-e8a7b.appspot.com"
};
firebase.initializeApp(config);
module.exports = firebase;

console.log('Firebase Admin Initialized');


