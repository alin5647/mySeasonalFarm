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

// Initialize FireauthUI
var fireauth = new firebaseui.auth.AuthUI(firebase.auth());

var fireauthConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

fireauth.start("#firebaseui-auth-container", fireauthConfig)
