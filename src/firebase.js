import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCW_uH67yd3deA6L7ntc2QvVgH72JzTlVs",
    authDomain: "my-project-a0779.firebaseapp.com",
    databaseURL: "https://my-project-a0779.firebaseio.com",
    projectId: "my-project-a0779",
    storageBucket: "my-project-a0779.appspot.com",
    messagingSenderId: "56493708237"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
