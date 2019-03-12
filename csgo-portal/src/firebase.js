import firebase from 'firebase/app';
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD2j4aTLnUbf_8ZmZZc_Lj4OGqH43lWI2A",
    authDomain: "csgo-portal.firebaseapp.com",
    databaseURL: "https://csgo-portal.firebaseio.com",
    projectId: "csgo-portal",
    storageBucket: "csgo-portal.appspot.com",
    messagingSenderId: "274291531051"
};

firebase.initializeApp(config);

const database = firebase.database();
const dbMatches = database.ref('matches');
const dbTeams = database.ref('teams');

export {
    firebase,
    dbMatches,
    dbTeams,
    database
}

