import React from 'react'
import Head from 'next/head'
import { AppBar, Container, Link, Toolbar, Typography } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'

export default function Layout({ title, children, description }) {
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>{title ? `${title} - Style Club` : "Style Club"}</title>
                {description && <meta name="description" content={description}> </meta>}
            </Head>
            <AppBar className={classes.navbar} position="static">
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                            <Typography className={classes.brand}>Style Club</Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow} />
                        <NextLink href="/cart" passHref>
                            <Link>
                                Cart
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
        </div>
    )
}
