import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
import App from './App';

// Add your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyC-DGN28nSK0QepErBIca6s68MZc8Mnlks",
  authDomain: "expense-tracker-app-b7f2b.firebaseapp.com",
  projectId: "expense-tracker-app-b7f2b",
  storageBucket: "expense-tracker-app-b7f2b.appspot.com",
  messagingSenderId: "85250208214",
  appId: "1:85250208214:web:883ff08f34a4a990a17477"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore(); // Get the Firestore instance

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App firestore={firestore} /> {/* Pass the Firestore instance as a prop */}
  </Provider>,
  document.getElementById('root')
);
