import React, { useContext } from 'react'
import Head from 'next/head'
import { AppBar, Container, createTheme, Link, Toolbar, Badge, Typography, ThemeProvider, CssBaseline, Switch } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie';

export default function Layout({ title, children, description }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart } = state;
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
                        <NextLink href="/login" passHref>
                            <Link>
                                Login
                            </Link>
                        </NextLink>
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
