import { Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Select, MenuItem, Button, Card, List, ListItem } from '@material-ui/core';
import React from 'react'
import Layout from '../components/Layout';
import { Store } from '../utils/Store'
import NextLink from 'next/link'
import Image from 'next/image'

export default function CartScreen() {
    const { state } = React.useContext(Store);
    const { cart: { cartItems } } = state;

    return (
        <Layout title="Your Cart">
            <Typography component="h1" variant="h1">Your Cart</Typography>
            {cartItems.length === 0 ? <div>
                Your cart is empty. <NextLink href="/"> Go Browsing </NextLink>
            </div> : (
                <Grid container spacing={3}>
                    <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item)=>(
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                        <Image height={50} width={50} src={item.image} alt={item.name} />
                                                    </Link>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                        <Typography>{item.name}</Typography>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Select value={item.quantity}>
                                                    {[...Array(item.countInStock).keys()].map( (x) =><MenuItem key={x+1} value={x+1}>{x+1}</MenuItem> )}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="right">
                                                ₹{item.price}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="secondary">X</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : ₹ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button color="primary" variant="contained" fullWidth>
                                        Check out
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
                )}
        </Layout>
    )
}
