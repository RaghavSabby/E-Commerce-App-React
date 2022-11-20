import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, useTheme, CardContent, Box, TextField, Rating, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSubTotal } from '../utlis';
import { addToCart, removeFromCart } from '../feature/cart-slice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const cart = useSelector((state) => state.cart?.value);

  const theme = useTheme();

  const subTotal = getSubTotal(cart).toFixed(2);
  const dispatch = useDispatch()

  function updateQuantity(event, { product, quantity }) {
    const updatedQuanity = event.target.valueAsNumber;
    if (updatedQuanity < quantity) {
      // remove that product from the cart
      dispatch(removeFromCart({ product }))
    } else {
      dispatch(addToCart({ product }));
    }
  }

  const navigate = useNavigate()
  function gotToHome() {
    navigate("/");
  }

  function gotToCheckoutPage(){
    navigate("/checkout")
  }

  return (
    <Container sx={{
      py: 8
    }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity}) => {
            const { title, id, price, description, rating: { rate }, image } = product;
            return (
              <Grid item key={id} xs={12} >
                <Card sx={{
                  display: "flex",
                  py: 2,
                }}>
                  <CardMedia component="img" image={image} alt={title} sx={{
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: "contain",
                    pt: theme.spacing(),
                  }} />
                  <CardContent sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}>
                      <Typography variant='h5'>{title}</Typography>
                      <Rating readOnly precision={0.5} value={rate}/>
                      <form>
                        <TextField sx={{
                          width: theme.spacing(8)
                        }} value={quantity} label="Quantity" id={'${id}-product-id'} type="number" variant='standard' inputProps={{
                          min: 0,
                          max: 10
                        }} onChange={(event) => updateQuantity(event, { product, quantity })}></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant='h5' paragraph>
                        ${getSubTotal([{ product, quantity }]).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>)
          })}
        </Grid>
        <Grid item md={4} sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Box sx={{
          width: "100%",

        }}>
          <Card sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
            <Typography variant='h4'>SubTotal</Typography>
            <Typography variant='h5'>${subTotal}</Typography>
            {subTotal > 0 ? <Button variant='contained' onClick={gotToCheckoutPage}>Buy Now</Button> : <Button variant='contained' onClick={gotToHome}>Shop product</Button>}
          </Card>
        </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
