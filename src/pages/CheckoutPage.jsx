import { Paper, StepLabel, Stepper, Typography, Step, Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import AddressForm from '../component/AddressForm';
import PaymentsForm from '../component/PaymentsForm';
import ReviewForm from '../component/ReviewForm';
import { clearCart } from '../feature/cart-slice';
import { clearCheckoutInformation } from '../feature/checkout-slice';
import { Link } from 'react-router-dom';

const steps = ["Shipping Address", "Payment Details", "Review Order"];

function getStepContent(activeStep) {
  switch (activeStep) {
    case 0:
      return (<AddressForm />)
    case 1:
      return (<PaymentsForm />)
    case 2:
      return (<ReviewForm />)
    default:
      throw new Error("Unknown step");
  }
}

export default function CheckoutPage() {

  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeStep === steps.length) {
      dispatch(clearCart());
      dispatch(clearCheckoutInformation());
    }
  }, [activeStep])

  function handleNext(){
    setActiveStep(activeStep+1);
  }

  function handlePrevious() {
    setActiveStep(activeStep-1);
  }

  return (
    <Container component={"section"} maxWidth="lg" sx={{
      mb: 4,
    }}>
      <Paper variant='outlined' sx={{
        my: {xs: 3, md: 6},
        p: {xs: 2, md: 3},
      }}>
        <Typography component={"h1"} variant="h4" align='center'>Checkout</Typography>
        <Stepper activeStep={activeStep} sx={{
          pt: 3,
          pb: 5
        }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? <>
          <Typography variant='h5' gutterbottom>
            Thank you for Ordering
          </Typography>
          <Typography>
            Your order number is #12234. We have emailed you the details regarding your order confirmation.
          </Typography>
          <Typography>Happy Shopping!</Typography>
          <Link to="/">Shop More</Link>
        </> : <>
          {getStepContent(activeStep)}
          <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
            {activeStep !== 0 && <Button sx={{
              mt: 2
            }} onClick={handlePrevious} variant="contained">Back</Button>}
            <Button variant="contained" onClick={handleNext} sx={{
              ml: 1,
              mt: 2
            }}>{activeStep === steps.length-1 ? "Place Order" : "Next"}</Button>
          </Box>
        </>}
      </Paper>
    </Container>
  )
}
