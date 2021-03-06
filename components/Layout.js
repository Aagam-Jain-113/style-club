import React, { useContext } from 'react'
import Head from 'next/head'
import { AppBar, Container, createTheme, Link, Menu, MenuItem, Toolbar, Badge, Typography, ThemeProvider, CssBaseline, Switch, Button } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export default function Layout({ title, children, description }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart, userInfo } = state;
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.5rem',
                fontWeight: "500",
                margin: "1rem 0",
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: "400",
                margin: "1rem 0",
            },
            body1: {
                fontWeight: "normal",
            },
        },
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#ff9f43',
            },
            secondary: {
                main: '#208080',
            },
        },
    })
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect) {
            router.push(redirect);
        }
    }
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/');
    }
    return (
        <div>
            <Head>
                <title>{title ? `${title} - Style Club` : "Style Club"}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar color="default" className={classes.navbar} position="static">
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography className={classes.brand}>Style Club</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow} />
                        <Switch
                            checked={darkMode}
                            onChange={darkModeChangeHandler}
                        ></Switch>
                        <NextLink href="/cart" passHref>
                            <Link>
                                {(cart.cartItems.length > 0) ? <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge> : 'Cart'}
                            </Link>
                        </NextLink>
                        {userInfo ? (
                            <>
                                <Button
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={loginClickHandler}
                                    className={classes.navbarButton}
                                >
                                    {userInfo.name}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={loginMenuCloseHandler}
                                >
                                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>
                                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/order-history')}>
                                        Order History
                                    </MenuItem>
                                    {userInfo.isAdmin && (
                                        <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/admin/dashboard')}>
                                            Admin Dashboard
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </>) :
                            <NextLink href="/login" passHref>
                                <Link>
                                    Login
                                </Link>
                            </NextLink>
                        }
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography> &#169; All rights reserved.Style Club</Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}
