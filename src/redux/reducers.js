import { combineReducers } from 'redux';

const transactionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [...state, action.payload];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  transactions: transactionsReducer
});

export default rootReducer;
