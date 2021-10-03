import React from 'react'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import useStyles from '../utils/styles'

export default function Layout({children}) {
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>Style Club</title>
            </Head>
            <AppBar className={classes.navbar} position="static">
                <Toolbar>
                    <Typography>Style Club</Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer  className={classes.footer}>
                <Typography> &#169; All rights reserved.Style Club</Typography>
            </footer>
        </div>
    )
}
