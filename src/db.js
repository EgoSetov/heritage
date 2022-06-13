import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
	apiKey: "AIzaSyB_Aq0rBpwOcrbLM9n-rIxQHN38nukT1B0",
	authDomain: "heritage-b475a.firebaseapp.com",
	databaseURL: "https://heritage-b475a-default-rtdb.firebaseio.com",
	projectId: "heritage-b475a",
	storageBucket: "heritage-b475a.appspot.com",
	messagingSenderId: "1038614162962",
	appId: "1:1038614162962:web:0504abcd10154adf12b2cb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const Route = db.collection('Routes')
const Client = db.collection('Clients')
const Review = db.collection('Reviews')
export {
	db,
	Route,
	Client,
	Review
};

