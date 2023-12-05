// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebase: {
  apiKey: "AIzaSyCDK8skgBXPHhYo9iuCb0nyanwTDjHdjUE",
  authDomain: "aaeca-2d9ff.firebaseapp.com",
  projectId: "aaeca-2d9ff",
  storageBucket: "aaeca-2d9ff.appspot.com",
  messagingSenderId: "417703410109",
  appId: "1:417703410109:web:fbe980826e2e2fdcefbad4",
  measurementId: "G-HKYGDBNKP7"
  },

  // add here all API related server address - 17/6/23
  // SERVER:'http://154.61.69.200:3000/api/v1',
  SERVER:'http://localhost:3000/api/v1', 
  PORT:'',

};

// const firebaseConfig = {
  
// };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
