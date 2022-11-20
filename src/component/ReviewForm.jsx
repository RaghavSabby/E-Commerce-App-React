import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { getSubTotal } from '../utlis';

export default function ReviewForm() {
    const cart = useSelector((state) => state.cart.value);
    const address = useSelector((state) => state.checkout.address);
    const addresses = address ? Object.values(address) : [];
    const payment = useSelector((state) => state.checkout.payment);
    const payments = payment ? [
        {
            name: "Card Type",
            detail: "Visa",
        },
        {
            name: "Card Number",
            detail: payment.cardNumber,
        },
        {
            name: "Card Holder",
            detail: payment.cardName,
        },
        {
            name: "Expiry Date",
            detail: payment.expDate,
        },
    ] : [];

    const theme = useTheme();

  return (
    <>
        <Typography variant='h6' gutterbottom>Order Summary</Typography>
        <List disablePadding>
            {cart.map(({ product, quantity }) => (
                <ListItem key={product.title} sx={{
                    py: 1, 
                    px: 0,
                }}>
                    <ListItemText primary={product.title} secondary={`Qty: ${quantity}`} sx={{
                        "& .MuiListItemText-primary": {
                            fontWeight: 500,
                        },
                        "& .MuiListItemText-secondary": {
                            fontSize: theme.spacing(2),
                        },
                    }} />
                    <Typography variant='body2'>{`$${getSubTotal([{ product, quantity }]).toFixed(2)}`}</Typography>
                </ListItem>
            ))}
            <ListItem sx={{
                py: 1,
                px: 0
            }}>
                <ListItemText primary="Total"/>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 700,
                }}>{`$${getSubTotal(cart).toFixed(2)}`}</Typography>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} direction="column">
                <Typography variant='h6' gutterbottom sx={{
                    mt: 2
                }}>Shipping</Typography>
                <Typography gutterbottom>
                    {addresses.join(", ")}
                </Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6} sx={{
                    mt: 2
                }}>
                <Typography variant='h6'>Payment Details</Typography>
                <Grid container>
                    {payments.map(({ name, detail }) => <>
                        <Grid item key={name} xs={6}>
                            <Typography gutterbottom>{name}</Typography>
                        </Grid>
                        <Grid item key={detail} xs={6} gutterbottom>
                            <Typography>{detail}</Typography>
                        </Grid>
                    </>)}
                </Grid>
            </Grid>
        </Grid>
    </>
  )
}
