// импорт зависимостей
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// конфиг для подключение к БД
const firebaseConfig = {
	apiKey: "AIzaSyB_Aq0rBpwOcrbLM9n-rIxQHN38nukT1B0",
	authDomain: "heritage-b475a.firebaseapp.com",
	databaseURL: "https://heritage-b475a-default-rtdb.firebaseio.com",
	projectId: "heritage-b475a",
	storageBucket: "heritage-b475a.appspot.com",
	messagingSenderId: "1038614162962",
	appId: "1:1038614162962:web:0504abcd10154adf12b2cb"
};

// инициализация проекта
const firebaseApp = firebase.initializeApp(firebaseConfig);

// инициализация БД и подключение к ней
const db = firebaseApp.firestore();

// переменные позволяющие удобно взаимодействовать с коллекциями
const Route = db.collection('Routes')
const Client = db.collection('Clients')
const Review = db.collection('Reviews')

// экспорт переменных
export {
	db,
	Route,
	Client,
	Review
};

