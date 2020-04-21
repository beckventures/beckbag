import * as firebase from 'firebase';

const config = { apiKey: 'AIzaSyDbJ9PaKez5_8BdorROuEjZ9lvRC9_634M', authDomain: 'beckme.firebaseapp.com', databaseURL: 'https://beckme.firebaseio.com', projectId: 'project-1348531828359008657', storageBucket: 'project-1348531828359008657.appspot.com', messagingSenderId: '589734135552' };

const firebaseinit = firebase.initializeApp(config);
export default firebaseinit;
