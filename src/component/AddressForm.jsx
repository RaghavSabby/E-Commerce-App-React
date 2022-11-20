import { Typography, Box, Grid, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAddress } from '../feature/checkout-slice';

export default function AddressForm() {
    const address = useSelector((state) => state.checkout?.address);
    const dispatch = useDispatch()

    function handleChange(event) {
        const { name, value } = event.target;
        dispatch(updateAddress({ [name]: value }))
    }

  return (
    <>
        <Typography variant='h6' gutterbottom>
            Shipping Address
        </Typography>
        <Box component="form" onChange={handleChange}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required id="firstname" name='firstname' label="First Name" fullWidth autoComplete='give-name' variant='standard' autoFocus/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="lastname" name='lastname' label="Last Name" fullWidth autoComplete='family-name' variant='standard'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="address1" name='address1' label="Address Line 1" fullWidth autoComplete='shipping address-line1' variant='standard'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="address2" name='address2' label="Address Line 2" fullWidth autoComplete='shipping address-line2' variant='standard'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="city" name='city' label="City" fullWidth autoComplete='shipping city' variant='standard'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="zipCode" name='zipCode' label="Zip Code/ Postal Code" fullWidth  variant='standard'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="country" name='country' label="Country" fullWidth variant='standard'/>
                </Grid>
            </Grid>
        </Box>  
    </>
  )
}
