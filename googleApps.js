// Google Place API Autocomplete

let autocomplete;

function initMap() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      componentRestriction: { country: ["TW"] },
      fields: ["address_component"],
    }
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
}

// Google Firebase API
// Google Firebase Config & Init
var firebaseConfig = {
  apiKey: "AIzaSyD0KW8KyZUgOIalSNUP0bGWs5qN0IoMCcw",
  authDomain: "myseasonalfarm-webiste.firebaseapp.com",
  projectId: "myseasonalfarm-webiste",
  storageBucket: "myseasonalfarm-webiste.appspot.com",
  messagingSenderId: "792772132868",
  appId: "1:792772132868:web:e477eda7f7e9981d2c3551",
  measurementId: "G-90R5T15VDH",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Firestore
var firestore = firebase.firestore(); 


