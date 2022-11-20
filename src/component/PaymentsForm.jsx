import { Typography, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../feature/checkout-slice';

export default function PaymentsForm() {
    const dispatch = useDispatch();
    const payment = useSelector((state) => state.checkout.payment);

    function handleChange(event) {
        const { name, value } = event.target;
        dispatch(updatePayment(({ [name]: value })))
    }

  return (
    <>
        <Typography variant='h6' gutterbottom>Payment Method</Typography>
        <Box component="form" onChange={(event) => handleChange(event)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField name="cardName" id='cardName' variant='standard' required label="Name on card" fullWidth autoComplete='cc-name'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name='cardNumber' id='cardNumber' variant='standard' required label="Card Number" fullWidth autoComplete='cc-number'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name='expDate' id='expDate' variant='standard' required label="Expiry Date" fullWidth autoComplete='cc-exp'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField name='cvv' id='cvv' variant='standard' required label="CVV" fullWidth autoComplete='cc-csc' type="password"/>
                </Grid>
            </Grid>
        </Box>
    </>
  )
}
