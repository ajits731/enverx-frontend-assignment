import { put, takeLatest } from 'redux-saga/effects';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function* addTransaction(action) {
  try {
    const { description, amount } = action.payload;
    // Add transaction to Firebase Firestore
    yield firebase.firestore().collection('transactions').add({ description, amount });
  } catch (error) {
    // Handle error
  }
}

function* watchAddTransaction() {
  yield takeLatest('ADD_TRANSACTION', addTransaction);
}

function* rootSaga() {
  yield watchAddTransaction();
}

export default rootSaga;
