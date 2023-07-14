import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, Typography, FormControl, Select, MenuItem, TextField } from '@material-ui/core';

const TransactionList = ({ firestore }) => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategorySummary = () => {
    const summary = {};
    transactions.forEach((transaction) => {
      if (summary[transaction.category]) {
        summary[transaction.category] += transaction.amount;
      } else {
        summary[transaction.category] = transaction.amount;
      }
    });
    return summary;
  };

  const getTransactionList = () => {
    let filteredTransactions = transactions;
    if (selectedCategory) {
      filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTransactions = filteredTransactions.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(query) ||
          transaction.category.toLowerCase().includes(query)
      );
    }
    return filteredTransactions.map((transaction) => (
      <ListItem key={transaction.id}>
        <ListItemText
          primary={transaction.description}
          secondary={`Amount: ${transaction.amount}`}
        />
      </ListItem>
    ));
  };

  const categorySummary = getCategorySummary();
  const totalBalance = Object.values(categorySummary).reduce((sum, amount) => sum + amount, 0);

  useEffect(() => {
    const transactionsRef = firestore.collection('transactions');
    const unsubscribe = transactionsRef.onSnapshot((snapshot) => {
      const updatedTransactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: 'SET_TRANSACTIONS', payload: updatedTransactions });
    });

    return () => {
      unsubscribe(); // Call the unsubscribe function to detach the listener
    };
  }, [dispatch, firestore]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Transaction List
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total Balance: ${totalBalance.toFixed(2)}
      </Typography>
      <FormControl>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          {Object.keys(categorySummary).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
      {transactions.length > 0 ? (
        <List>
          {getTransactionList()}
        </List>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No transactions found.
        </Typography>
      )}
    </div>
  );
};

export default TransactionList;
