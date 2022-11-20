import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../feature/cart-slice';
import { fetchAllProducts } from '../feature/products-slice';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    // To read the URL
    const [ searchParams ] = useSearchParams();
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("searchterm");
    
    const theme = useTheme();

    const state = useSelector((state) => state.products)
    const {value: products, loading} = state ?? {};
    // to dispatch an action
    const dispatch = useDispatch();

    if (!products?.length) {
        dispatch(fetchAllProducts());
    }

    function addProductToCart(product) {
        // dispatch an action with payload
        dispatch(addToCart({product, quantity: 1}));
    }

    // If there is a category and category is not equal to All, then filter the products according to category
    let filteredProducts = category && category !== "All" ? products.filter((product) => product.category === category) : products;

    // further filtering down, and adding search functionality
    filteredProducts = searchTerm ? filteredProducts.filter((product) => product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) : filteredProducts

    return (
        <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
                {filteredProducts.map(
                    ({ id, title, price, description, image, rating: { rate } }) => (
                        <Grid item key={id} xs={12} sm={6} md={3}>
                            <Card sx={{height: "100%", display: "flex", flexDirection: "column", padding: theme.spacing(2, 0)}}>
                                <CardMedia image={image} component="img" alt={title} sx={{ alignSelf: "center", width: theme.spacing(30), height: theme.spacing(30), objectFit: "contain", pt:theme.spacing() }}/>
                                <CardContent>
                                {/* Predefined styles can be used using "variant" but final HTML element can be set with "component" */}
                                    <Typography variant='h5' component="h2" gutterbottom sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>{title} </Typography>
                                    <Typography color="text.secondary" paragraph sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>{description}</Typography>
                                    <Typography fontSize="large" paragraph>${price}</Typography>
                                    <Rating readOnly precision={0.5} value={rate}/>
                                </CardContent>
                                <CardActions sx={{
                                    alignSelf: "center"
                                }}>
                                    <Button variant='contained' onClick={() => addProductToCart({ id, title, price, description, image, rating: { rate } })}>
                                        <ShoppingCartIcon />
                                        Add to cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                )}
            </Grid>
        </Container>
    )
}
