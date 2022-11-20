import { AppBar, Badge, Button, Box, IconButton, Toolbar, Typography, Autocomplete, TextField, Select, MenuItem, Menu } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getItemsCount } from '../utlis';
import { styled, alpha } from '@mui/material/styles';
import { fetchAllCategories } from '../feature/categories-slice';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../firebase/Auth';

// for custom properties to an element
const Search = styled("section")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    // alpha providing us the opacity
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "100%",
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiTextField-root": {
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
    },
    "& .MuiInputBase-input": {
        color: theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "& .MuiSvgIcon-root": {
        fill: theme.palette.common.white,
    },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    right: 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.common.white,
    textDecoration: "none",

}));

function SearchBar() {
    const theme = useTheme()

    const products = useSelector((state) => state.products?.value);
    const categories = useSelector((state) => state.categories?.value);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState("");

    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams();
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("searchterm");

    useEffect(() => {
      setSelectedCategory(category ? category : "All");
    }, [category]);
    
    if (!categories?.length) {
        dispatch(fetchAllCategories());
    }

    function handleCategoryChange(event) {
        const { value } = event.target;
        // setSelectedCategory(value);
        navigate(value === "All" ? "/" : `/?category=${value}${searchTerm ? "&seatchterm=" + searchTerm : ""}`);
    }

    function handleSearchChange(searchText) {
        if (searchText) {
            navigate(selectedCategory === "All" ? `?searchterm=${searchText}` : `/?category=${selectedCategory}&searchterm=${searchText}`);
        } else {
            navigate(selectedCategory === "All" ? `/` : `/?category=${selectedCategory}`);
        }
    }
    
    return (
        <Search>
            <Select value={selectedCategory} onChange={handleCategoryChange} size='small' variant="standard"
                 sx={{
                    textTransform: "capitalize",
                    m: 1,
                    "&": {
                        "::before": {
                            ":hover": {
                                border: "none",
                            },
                        },
                        "::before, &::after": {
                            border: "none",
                        },
                        ".MuiSelect-standard": {
                            color: "common.white",
                        },
                        ".MuiSelect-icon": {
                            fill: theme.palette.common.white,
                        }
                    }
                }} labelId="selected-category" id='selected-category-id'>
                <MenuItem value="All" sx={{
                    textTransform: "capitalize"
                    }}>All</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category} value={category} sx={{
                        textTransform: "capitalize"
                    }}>{category}</MenuItem>
                ))}
            </Select>
            <StyleAutocomplete
                freeSolo
                id="selected-product"
                disablePortal
                // showing products of the particular category
                options={Array.from(selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory), (product) => ({ id: product.id, label: product.title }))}
                onChange={(event, value) => handleSearchChange(value?.label)}
                renderInput={(params) => <TextField {...params} />}
                />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
        </Search>
    )
}

export default function Header() {

    // getting user from useAuth hook
    const { user, signOut } = useAuth();

    // We can read data from the store with useSelector
    const cartItems = useSelector((state) => state.cart.value);
    const count = getItemsCount(cartItems);

    const navigate = useNavigate()
    function onCartClick() {
        navigate("/cart");
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    function handleProfileMenuOpen(event) {
        setAnchorEl(event.target);
    }
    function handleMenuClose() {
        setAnchorEl(close);
    }
    async function logout() {
        await signOut();
        navigate("/login");
    }
    const renderMenu = (
        <Menu anchorEl={anchorEl} id="user-profile-menu" keepMounted texttransformorigin={{
            horizontal: "top",
            vertical: "right",
        }} anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
        }} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    )

    return (
        <>
            <AppBar position='sticky' sx={{
                py: 1,
            }}>
                <Toolbar sx={{
                    display: "flex",
                    gap: 2
                }}>
                    <Typography variant='h6' color='inherit'>
                        <StyledLink to="/">
                            ECOMM
                        </StyledLink>
                    </Typography>
                    <SearchBar />
                    <Box flexBasis={500} sx={{ display: { md: "flex" } }} >
                        <IconButton size='large' aria-label='show cart item count' color='inherit' onClick={onCartClick} sx={{ display: { xs: "none", md: "flex" } }}>
                            <Badge badgeContent={count} color='error'>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {user ? <Button  onClick={handleProfileMenuOpen} color='inherit' sx={{ display: { md: "flex" } }}>Hello, {user.displayName ?? user.email}</Button> : <Button color='inherit'>LOGIN</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    )
}
