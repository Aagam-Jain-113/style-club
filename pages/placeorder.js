import { Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Card, List, ListItem, CircularProgress } from '@material-ui/core';
import React from 'react'
import Layout from '../components/Layout';
import { Store } from '../utils/Store'
import NextLink from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/CheckoutWizard';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';

function PlaceOrder() {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(Store);
    const router = useRouter();
    const { userInfo, cart: { cartItems, shippingAddress, paymentMethod } } = state;

    const round2 = num => Math.round(num*100 + Number.EPSILON)/100;
    const itemsPrice = cartItems.reduce((a,c) => a+c.price*c.quantity,0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = round2(itemsPrice * 0.12);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    const {closeSnackbar, enqueueSnackbar} = useSnackbar();
    const [loading,setLoading] = React.useState(false)

    const placeOrderHandler = async()=>{
        closeSnackbar();
        try{
            setLoading(true);
            const { data } = await axios.post('/api/orders',{
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            },{
                headers:{
                    authorization: `Bearer ${userInfo.token}`,
                }
            });
            dispatch({type: 'CART_CLEAR'});
            Cookies.remove('cartItems');
            setLoading(false);
            router.push(`/order/${data._id}`);
        }
        catch(err){
            setLoading(false);
            console.log(err);
            enqueueSnackbar(getError(err), { variant: 'error'})
        }
    }
    
    React.useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
        if(cartItems.length === 0){
            router.push('/cart');
        }
    }, []);

    return (
        <Layout title="Place Order">
            <CheckoutWizard activeStep={3} />
            <Typography component="h1" variant="h1">Place Order</Typography>
            <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">Shipping Address</Typography>
                            </ListItem>
                            <ListItem>
                                {shippingAddress.fullName}, {shippingAddress.address},{''} {shippingAddress.city},{''} {shippingAddress.phoneNumber}
                            </ListItem>
                        </List>
                    </Card>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                {paymentMethod}
                            </ListItem>
                        </List>
                    </Card>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component="h2" variant="h2">Order Items</Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map((item) => (
                                                <TableRow key={item._id}>
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
                                                        <Typography>{item.quantity}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        ₹{item.price}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant="h2">
                                    Order Summary
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">₹{itemsPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Tax: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">₹{taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>shipping: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">₹{shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography><strong> Total: </strong> </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right"><strong> ₹{totalPrice} </strong> </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button color="primary" variant="contained" fullWidth onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                            </ListItem>
                            {loading && 
                            (<ListItem>
                                <CircularProgress/>
                            </ListItem> )}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false })
