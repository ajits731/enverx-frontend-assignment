import React from 'react';
import { Container, Typography } from '@material-ui/core';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import 'firebase/compat/firestore';

function App(props) {
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Expense Tracker
      </Typography>
      <TransactionForm firestore={props.firestore} />
      <TransactionList firestore={props.firestore} />
    </Container>
  );
}

export default App;
