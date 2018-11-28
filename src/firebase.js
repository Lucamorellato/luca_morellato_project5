import firebase from 'firebase';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyCrMoX8GEr2gB2vYy4S-BMTJ04pwxUDk_U",
   authDomain: "rest-stop-review.firebaseapp.com",
   databaseURL: "https://rest-stop-review.firebaseio.com",
   projectId: "rest-stop-review",
   storageBucket: "rest-stop-review.appspot.com",
   messagingSenderId: "1086783444232"
};
firebase.initializeApp(config);

export default firebase;