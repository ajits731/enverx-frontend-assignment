import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Typography } from '@material-ui/core';

const TransactionForm = ({ firestore }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      description,
      amount: parseFloat(amount),
      category,
    };

    try {
      const docRef = await firestore.collection('transactions').add(newTransaction);
      const transactionWithId = { ...newTransaction, id: docRef.id };
      dispatch({ type: 'ADD_TRANSACTION', payload: transactionWithId });
      setDescription('');
      setAmount('');
      setCategory('');
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Add Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default TransactionForm;
